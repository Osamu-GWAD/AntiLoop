package storage

import "testing"

func TestReauthorizeAccountReturnsItsOwnIDAndStoredMetadata(t *testing.T) {
	db, err := Open(t.TempDir())
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	a, err := db.AddAccount("a@example.com", "refresh-a", "included", "pro", 1)
	if err != nil {
		t.Fatal(err)
	}
	b, err := db.AddAccount("b@example.com", "refresh-b", "included", "standard", 2)
	if err != nil {
		t.Fatal(err)
	}
	if err := db.UpdateAccountProject(a.ID, "project-a"); err != nil {
		t.Fatal(err)
	}
	updated, err := db.AddAccount(a.Email, "new-refresh-a", "included", "unknown", 0)
	if err != nil {
		t.Fatal(err)
	}
	if updated.ID != a.ID || updated.Tier != "pro" || updated.ProjectID != "project-a" || updated.SortOrder != 1 {
		t.Fatalf("upsert returned the wrong stored account: %+v", updated)
	}
	if err := db.UpdateAccountToken(updated.ID, "new-access-a", "2099-01-01T00:00:00Z"); err != nil {
		t.Fatal(err)
	}
	storedA, _ := db.GetAccount(a.ID)
	storedB, _ := db.GetAccount(b.ID)
	if storedA.AccessToken != "new-access-a" || storedA.RefreshToken != "new-refresh-a" || storedB.AccessToken != "" || storedB.RefreshToken != "refresh-b" {
		t.Fatal("reauthorization changed another account's credentials")
	}
}

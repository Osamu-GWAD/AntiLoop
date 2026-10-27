package applog

import (
	"fmt"
	"io"
	"log"
	"os"
	"sync"
)

var (
	mu     sync.Mutex
	logger *log.Logger
	debug  bool
)

func init() {
	logger = log.New(os.Stderr, "", log.LstdFlags|log.Lmicroseconds)
}

func Init(logFilePath string, isDebug bool) error {
	mu.Lock()
	defer mu.Unlock()

	debug = isDebug
	if logFilePath != "" {
		f, err := os.OpenFile(logFilePath, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0644)
		if err != nil {
			return err
		}
		mw := io.MultiWriter(os.Stderr, f)
		logger = log.New(mw, "", log.LstdFlags|log.Lmicroseconds)
	}
	return nil
}

func Printf(format string, v ...any) {
	mu.Lock()
	defer mu.Unlock()
	logger.Output(2, fmt.Sprintf(format, v...))
}

func Println(v ...any) {
	mu.Lock()
	defer mu.Unlock()
	logger.Output(2, fmt.Sprintln(v...))
}

func Debugf(format string, v ...any) {
	if !debug {
		return
	}
	mu.Lock()
	defer mu.Unlock()
	logger.Output(2, "[DEBUG] "+fmt.Sprintf(format, v...))
}

package app

import (
	"fmt"
	"inex/main/config"
	"inex/main/database/seeder"
	"inex/main/pkg/logger"
	"inex/main/pkg/postgres"
)

func Run(cfg *config.Config) {
	fmt.Println("Run app...")
	l := logger.New(cfg.Log.Level)

	pg, err := postgres.New(cfg.PG.URL, postgres.MaxPoolSize(cfg.PG.PoolMax))
	if err != nil {
		l.Fatal(fmt.Errorf("app - Run - postgres.New: %w", err))
	}
	defer pg.Close()

	seeder.SeedDatabase(cfg)
}

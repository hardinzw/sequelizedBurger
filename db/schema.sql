-- Drops the burger if it exists currently --
DROP DATABASE IF EXISTS burgers_db;
-- Creates the burger database --
CREATE DATABASE burgers_db;
USE burgers_db;

DROP TABLE IF EXISTS burgers;
DROP TABLE IF EXISTS customers;
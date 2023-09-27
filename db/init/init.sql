-- -----------------------------------------------------
-- Table Account
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Account (
  id SERIAL,
  email VARCHAR(45) NOT NULL UNIQUE,
  password VARCHAR(45) NOT NULL,
  type SMALLINT NOT NULL,
  create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);


-- -----------------------------------------------------
-- Table JobOffer
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS JobOffer (
  id SERIAL,
  Account_id INT NOT NULL,
  type SMALLINT NOT NULL,
  status SMALLINT NOT NULL,
  title VARCHAR(45) NULL,
  description VARCHAR(150) NULL,
  create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_JobOffer_Account
    FOREIGN KEY (Account_id)
    REFERENCES Account (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);


-- -----------------------------------------------------
-- Table CandidateProfile
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS CandidateProfile (
  id SERIAL,
  Account_id INT NOT NULL,
  Name VARCHAR(45) NOT NULL,
  Experiences VARCHAR(150) NULL,
  create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_CandidateProfile_Account
    FOREIGN KEY (Account_id)
    REFERENCES Account (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);


-- -----------------------------------------------------
-- Table JobApplication
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS JobApplication (
  id SERIAL,
  CandidateProfile_id INT NOT NULL,
  JobOffer_id INT NOT NULL,
  create_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  update_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_CandidateProfile_has_JobOffer_CandidateProfile
    FOREIGN KEY (CandidateProfile_id)
    REFERENCES CandidateProfile (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT fk_CandidateProfile_has_JobOffer_JobOffer
    FOREIGN KEY (JobOffer_id)
    REFERENCES JobOffer (id)
    ON DELETE CASCADE
    ON UPDATE NO ACTION
);

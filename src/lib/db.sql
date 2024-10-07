ALTER TABLE reservacupo ADD COLUMN kpsystem tinyint(1);

ALTER TABLE reservacupo
ADD COLUMN declaraparentesco TINYINT(3) UNSIGNED NULL,
ADD FOREIGN KEY (declaraparentesco) REFERENCES parentesco(id);

ALTER TABLE reservacupo
ADD COLUMN declarapais char(2) NULL,
ADD FOREIGN KEY (declarapais) REFERENCES pais(id);

ALTER TABLE reservacupo
ADD COLUMN prodtypeex varchar(45) NULL,
ADD COLUMN prodident varchar(45) NULL,
ADD COLUMN prodnum varchar(45) NULL,
ADD COLUMN prodmonto decimal(15,2) NULL,
ADD COLUMN prodcountr varchar(100) NULL,
ADD COLUMN prodmuni varchar(100) NULL,
ADD COLUMN prodmoneda varchar(45) NULL;
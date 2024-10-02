ALTER TABLE reservacupo ADD COLUMN kpsystem tinyint(1);

ALTER TABLE reservacupo
ADD COLUMN declaraparentesco TINYINT(3) UNSIGNED NULL,
ADD FOREIGN KEY (declaraparentesco) REFERENCES parentesco(id);

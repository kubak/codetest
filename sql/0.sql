DROP DATABASE issueTracker;
CREATE DATABASE issueTracker;

USE issueTracker;

CREATE TABLE issue (
   `issueID` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
   `issueName` CHAR(255) NOT NULL DEFAULT '',
   `issueDescription` TEXT NOT NULL,
   `issueState` ENUM('open', 'pending', 'closed') NOT NULL DEFAULT 'open',
   `issueModifiedDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO issue (issueName, issueDescription, issueState) VALUES 
('open issue', 'page does not open on potato', 'open'), 
('pending issue', 'page is slow', 'pending'), 
('closed', 'page does not work', 'closed');



-- TABLE `users`;

INSERT INTO `users` VALUES ('cat1','admin1',  'cat1');
INSERT INTO `users` VALUES ('cat2','admin2',  'cat2');
INSERT INTO `users` VALUES ('cat3','admin3',  'cat3');

INSERT INTO `users` VALUES ('cat4', 'provider1', 'cat4');
INSERT INTO `users` VALUES ('cat5', 'provider2', 'cat5');
INSERT INTO `users` VALUES ('cat6', 'provider3', 'cat6');

INSERT INTO `users` VALUES ('cat7', 'cimtuser1', 'cat7');
INSERT INTO `users` VALUES ('cat8', 'cimtuser2', 'cat8');
INSERT INTO `users` VALUES ('cat9', 'cimtUser3', 'cat9');


-- login page:

-- SELECT * FROM users WHERE username = ${username} and password = {password};


-- TABLE `admins`;

INSERT INTO `admins` VALUES ('1', 'admin1@team4.com', 'cat1');
INSERT INTO `admins` VALUES ('2', 'admin2@team4.com', 'cat2');
INSERT INTO `admins` VALUES ('3', 'admin3@team4.com', 'cat3');


-- TABLE `providers`;

INSERT INTO `providers` VALUES ('1', '111 provider Street, Some City, Some State, 11111', 'cat4');
INSERT INTO `providers` VALUES ('2', '222 provider Street, Some City, Some State, 22222', 'cat5');
INSERT INTO `providers` VALUES ('3', '333 provider Street, Some City, Some State, 33333', 'cat6');



-- TABLE `cimtUsers`;

INSERT INTO `cimtusers` VALUES ('1', '111-111-1111', 'cat7');
INSERT INTO `cimtusers` VALUES ('2', '222-222-2222', 'cat8');
INSERT INTO `cimtusers` VALUES ('3', '333-333-3333', 'cat9');



-- TABLE `units`;


INSERT INTO `units` VALUES ('1', 'hour');
INSERT INTO `units` VALUES ('2', 'day');
INSERT INTO `units` VALUES ('3', 'week');
INSERT INTO `units` VALUES ('4', 'each');
INSERT INTO `units` VALUES ('5', 'use');


SELECT * FROM units;

-- TABLE `resources`;

-- SELECT * FROM resources;


-- INSERT INTO  resources (`name`, `PFunctionID`, `SFunctionId`, `description`,`capability`, `distance`, `cost`,`username`,`unitId`)
-- VALUES ('cat100',2,3,'discription100','capability100', 0.1, 0.2, 'cat1', 1);



-- If no keyword, primary function, distance:

-- SELECT * FROM resources;
-- ORDER BY distance;


-- If keyword, primary function, distance:

-- SELECT * FROM resources 
-- WHERE resourceName LIKE ‘%keyword%’
-- AND description LIKE ‘%keyword%’
-- AND capability LIKE ‘%keyword%’
-- AND PFunctionId = ${PFunctionId} 
-- AND distance <= ${distance}
-- ORDER BY distance;



--respurces report page:

-- SELECT resourceFunctions.id, resourceFunctions.description, COUNT(resources.PFunctionId ) AS count, SUM(resources.PFunctionId)
--     FROM resources RIGHT OUTER JOIN resourceFunctions on resources.PFunctionId = resourceFunctions.id
--     AND resources.username="cat1"
--     GROUP BY resourceFunctions.id,resourceFunctions.description, 
--     ORDER BY resourceFunctions.id;


-- GET total resources owned by the user:

-- SELECT SUM(count) 
-- FROM (SELECT COUNT(resources.PFunctionId) AS count
--       FROM resources RIGHT OUTER JOIN resourceFunctions on resources.PFunctionId = resourceFunctions.id
--       AND resources.username="cat1"
--       GROUP BY resources.PFunctionId) as total;


  -- TABLE `resourceFunctions`;



INSERT INTO `resourceFunctions` VALUES ('1', '#1: transportation');
INSERT INTO `resourceFunctions` VALUES ('2', '#2: communications');
INSERT INTO `resourceFunctions` VALUES ('3', '#3: engineering');
INSERT INTO `resourceFunctions` VALUES ('4', '#4: search and rescue');
INSERT INTO `resourceFunctions` VALUES ('5', '#5: education');
INSERT INTO `resourceFunctions` VALUES ('6', '#6: energy');
INSERT INTO `resourceFunctions` VALUES ('7', '#7: firefighting');
INSERT INTO `resourceFunctions` VALUES ('8', '#8: human services');


SELECT * FROM resourcefunctions;

-- TABLE `incidents`;

-- INSERT INTO incidents (`categoryId`, `date`,`description`,`username`) 
-- VALUES ('c1','2022-07-10','description100','cat1');


-- DELETE FROM `incidents` WHERE (`id` = '1');

-- TABLE `categories`;


INSERT INTO `categories` VALUES ('c1', 'must evac, secure lockdown');
INSERT INTO `categories` VALUES ('c2', 'may evac, secure lockdown');
INSERT INTO `categories` VALUES ('c3', 'no evac, limited lockdownc');
INSERT INTO `categories` VALUES ('c4', 'no evac, no lockdown');


SELECT * FROM categories;



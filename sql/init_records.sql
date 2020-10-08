-- qualitative
INSERT INTO parameter (`code`, name) 
SELECT * FROM (SELECT "n" AS code, "N" AS name) tmp
WHERE NOT EXISTS (SELECT code FROM parameter WHERE code = tmp.code) LIMIT 1;

INSERT INTO parameter (`code`, name) 
SELECT * FROM (SELECT "percent" AS code, "%" AS name) tmp
WHERE NOT EXISTS (SELECT code FROM parameter WHERE code = tmp.code) LIMIT 1;


-- quantitative
INSERT INTO parameter (`code`, name) 
SELECT * FROM (SELECT "mean" AS code, "Mean" AS name) tmp
WHERE NOT EXISTS (SELECT code FROM parameter WHERE code = tmp.code) LIMIT 1;

INSERT INTO parameter (`code`, name) 
SELECT * FROM (SELECT "median" AS code, "Median" AS name) tmp
WHERE NOT EXISTS (SELECT code FROM parameter WHERE code = tmp.code) LIMIT 1;

INSERT INTO parameter (`code`, name) 
SELECT * FROM (SELECT "sd" AS code, "SD" AS name) tmp
WHERE NOT EXISTS (SELECT code FROM parameter WHERE code = tmp.code) LIMIT 1;

INSERT INTO parameter (`code`, name) 
SELECT * FROM (SELECT "se" AS code, "SE" AS name) tmp
WHERE NOT EXISTS (SELECT code FROM parameter WHERE code = tmp.code) LIMIT 1;

INSERT INTO parameter (`code`, name) 
SELECT * FROM (SELECT "min" AS code, "Min" AS name) tmp
WHERE NOT EXISTS (SELECT code FROM parameter WHERE code = tmp.code) LIMIT 1;

INSERT INTO parameter (`code`, name) 
SELECT * FROM (SELECT "max" AS code, "Max" AS name) tmp
WHERE NOT EXISTS (SELECT code FROM parameter WHERE code = tmp.code) LIMIT 1;

INSERT INTO parameter (`code`, name) 
SELECT * FROM (SELECT "iqr_25" AS code, "IQR 25%" AS name) tmp
WHERE NOT EXISTS (SELECT code FROM parameter WHERE code = tmp.code) LIMIT 1;

INSERT INTO parameter (`code`, name) 
SELECT * FROM (SELECT "iqr_75" AS code, "IQR 75%" AS name) tmp
WHERE NOT EXISTS (SELECT code FROM parameter WHERE code = tmp.code) LIMIT 1;

-- related factors -- qualitative
INSERT INTO parameter (`code`, name) 
SELECT * FROM (SELECT "test" AS code, "Test" AS name) tmp
WHERE NOT EXISTS (SELECT code FROM parameter WHERE code = tmp.code) LIMIT 1;

INSERT INTO parameter (`code`, name) 
SELECT * FROM (SELECT "mean_difference" AS code, "Mean difference" AS name) tmp
WHERE NOT EXISTS (SELECT code FROM parameter WHERE code = tmp.code) LIMIT 1;

INSERT INTO parameter (`code`, name) 
SELECT * FROM (SELECT "lower_95" AS code, "95% CI lower" AS name) tmp
WHERE NOT EXISTS (SELECT code FROM parameter WHERE code = tmp.code) LIMIT 1;

INSERT INTO parameter (`code`, name) 
SELECT * FROM (SELECT "upper_95" AS code, "95% CI upper" AS name) tmp
WHERE NOT EXISTS (SELECT code FROM parameter WHERE code = tmp.code) LIMIT 1;

INSERT INTO parameter (`code`, name) 
SELECT * FROM (SELECT "p_value" AS code, "p value" AS name) tmp
WHERE NOT EXISTS (SELECT code FROM parameter WHERE code = tmp.code) LIMIT 1;

-- related factors -- quantitative
INSERT INTO parameter (`code`, name) 
SELECT * FROM (SELECT "test_value" AS code, "Test value" AS name) tmp
WHERE NOT EXISTS (SELECT code FROM parameter WHERE code = tmp.code) LIMIT 1;

-- cost effectivenss
INSERT INTO parameter (`code`, name) 
SELECT * FROM (SELECT "cost" AS code, "Cost" AS name) tmp
WHERE NOT EXISTS (SELECT code FROM parameter WHERE code = tmp.code) LIMIT 1;

INSERT INTO parameter (`code`, name) 
SELECT * FROM (SELECT "effectivenss" AS code, "Effectivenss" AS name) tmp
WHERE NOT EXISTS (SELECT code FROM parameter WHERE code = tmp.code) LIMIT 1;

INSERT INTO parameter (`code`, name) 
SELECT * FROM (SELECT "icer" AS code, "ICER" AS name) tmp
WHERE NOT EXISTS (SELECT code FROM parameter WHERE code = tmp.code) LIMIT 1;

INSERT INTO parameter (`code`, name) 
SELECT * FROM (SELECT "icer_result" AS code, "Result" AS name) tmp
WHERE NOT EXISTS (SELECT code FROM parameter WHERE code = tmp.code) LIMIT 1;
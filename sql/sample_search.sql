SELECT *
FROM article
WHERE 
	(
		title REGEXP "chi phí" OR
		title REGEXP "cost" OR
		abstract REGEXP "chi phí" OR
		abstract REGEXP "cost" OR
		key_words REGEXP "chi phí" OR
		key_words REGEXP "cost"
	) AND
	(
		title REGEXP "đột quỵ" OR
		title REGEXP "stroke" OR
		abstract REGEXP "đột quỵ" OR
		abstract REGEXP "stroke" OR
		key_words REGEXP "chi phí" OR
		key_words REGEXP "cost"
	) AND
	(
		title REGEXP "phục hồi chức năng" OR
		title REGEXP "rehabilitation" OR
		abstract REGEXP "phục hồi chức năng" OR
		abstract REGEXP "rehabilitation" OR
		key_words REGEXP "phục hồi chức năng" OR
		key_words REGEXP "rehabilitation"
	)

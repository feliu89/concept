CREATE TABLE public.user (
	userId	serial,
	userFirstName	varchar(40),
	userLastName	varchar(40),
	userEmail	varchar(40),
	userPassword	varchar(60),
	userPasswordSalt	int DEFAULT NULL,
	userPasswordHashAlgorithm	varchar(10) DEFAULT 'bcrypt',
	userImagePath	varchar(255),
	userIsActive	boolean DEFAULT TRUE,
	userCreatedAt	timestamp DEFAULT current_timestamp,
	userCreatedBy	integer DEFAULT NULL,
	userUpdatedAt	timestamp DEFAULT NULL,
	userUpdatedBy	integer DEFAULT NULL,
	userDeletedAt	timestamp DEFAULT NULL,
	userDeletedBy	integer DEFAULT NULL,
);

CREATE TABLE public.post (
	postId	serial,
	postName	varchar(40),
	postDescription	varchar(100),
	postContents	varchar(100),
	postType	varchar(60),
	postCategoryId	integer DEFAULT NULL,
	postIsPrivate	boolean DEFAULT NULL,
	postStatus	varchar(40),
	postIsArchived	boolean DEFAULT NULL,
	postCreatedAt	timestamp DEFAULT current_timestamp,
	postCreatedBy	integer DEFAULT NULL,
	postUpdatedAt	timestamp DEFAULT NULL,
	postUpdatedBy	integer DEFAULT NULL,
	postDeletedAt	timestamp DEFAULT NULL,
	postDeletedBy	integer DEFAULT NULL,
);

CREATE TABLE public.category (
	categoryId	serial,
	categoryName	varchar(40),
	categoryDescription	varchar(100),
	categoryCreatedAt	timestamp DEFAULT current_timestamp,
	categoryCreatedBy	integer DEFAULT NULL,
	categoryUpdatedAt	timestamp DEFAULT NULL,
	categoryUpdatedBy	integer DEFAULT NULL,
	categoryDeletedAt	timestamp DEFAULT NULL,
	categoryDeletedBy	integer DEFAULT NULL,
);


-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 11, 2018 at 01:36 AM
-- Server version: 5.6.35
-- PHP Version: 7.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `cinema`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '2'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `category_name`, `created_at`, `modified_at`, `is_deleted`) VALUES
(1, 'action movie', '2018-01-10 22:07:56', '2018-01-10 15:07:56', 2),
(2, 'Funny', '2018-01-10 22:07:56', '2018-01-10 15:07:56', 2),
(3, 'Science', '2018-01-10 22:08:32', '2018-01-10 15:08:32', 2),
(4, 'Love', '2018-01-10 22:08:32', '2018-01-10 15:08:32', 2),
(5, 'advanture', '2018-01-10 23:49:20', '2018-01-10 16:49:20', 2),
(6, 'horror movie', '2018-01-10 23:49:58', '2018-01-10 16:49:58', 2);

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `cover_image` varchar(100) NOT NULL,
  `trailer_url` varchar(100) NOT NULL,
  `visit_count` int(11) NOT NULL DEFAULT '1',
  `description` text NOT NULL,
  `rating` int(11) NOT NULL DEFAULT '1',
  `category` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '2' COMMENT 'value 2 is active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`id`, `title`, `cover_image`, `trailer_url`, `visit_count`, `description`, `rating`, `category`, `created_at`, `modified_at`, `is_deleted`) VALUES
(1, 'avenger 1', '2gb.png', 'www.google.com', 1, '', 1, 1, '2018-01-10 22:34:23', '2018-01-10 17:46:23', 2),
(2, 'avenger 2', '2gb.png', 'www.google.com', 1, 'best movie', 1, 1, '2018-01-10 22:35:28', '2018-01-10 17:46:28', 2),
(3, 'avenger 3', 'no', 'no', 1, 'no descirption', 1, 1, '2018-01-11 00:34:12', '2018-01-10 17:46:34', 2),
(4, 'avenger 4', 'no', 'no', 3, 'no desciption', 1, 2, '2018-01-11 00:34:12', '2018-01-10 17:46:39', 2);

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

CREATE TABLE `setting` (
  `id` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  `value` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '2'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `setting`
--
ALTER TABLE `setting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

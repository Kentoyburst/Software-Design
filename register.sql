-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2025 at 10:19 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `registered_accounts`
--

-- --------------------------------------------------------

--
-- Table structure for table `register`
--

CREATE TABLE `register` (
  `id` int(11) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `register`
--

INSERT INTO `register` (`id`, `userName`, `email`, `password`, `role`) VALUES
(1, 'arthurnery', 'arthurnery@gmail.com', '$2y$10$3yf.88q7LOsSw2kw1um0Ke0VhZBTDGUkIWf9dhsc4PSKF0Uf230HG', 'faculty'),
(2, 'gripexsin123', 'gripexsin123@gmail.com', '$2y$10$zwi.H085AO30EMQmlN3RquT.XE9jYL5k0rNV4u6.SfH0RuxCnQqNS', 'faculty'),
(3, 'administrator', 'kentlaqui@gmail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin'),
(4, 'wawawee', 'wawawee@gmail.com', '$2y$10$NnXLPGsMuO6Sy526btsZB.nbxwSHj5C1dbiq8/ACXROGCmLHQqQhC', 'student'),
(5, 'Kean Shanley', 'keanshanley@gmail.com', '$2y$10$wIlTz/npPsFVaxTfwLi3Su5FqtKI8Cj1FMFRxzz4Ico7YBaUUu3Em', 'faculty'),
(6, 'wewewaa', 'wewewaa@gmail.com', '$2y$10$G2Od7AHcbGvAynSGhQqSPuZwVzPBcrEHVR6vGIwUrs5fk6fl4a3fG', 'faculty'),
(7, 'neil', 'neil@gmail.com', '$2y$10$aN8bbdeEvEMSMxe3QyRXdOc49jkfyGtGIDM/oTRbRB4pzuuctSPC6', 'student'),
(8, 'dummy', 'dummy@gmail.com', '$2y$10$pcgecDrsddwAqWdrR7p63uYzyef1.pHFC9Ne9MeL.JeweBTUAjxNe', 'student'),
(11, 'bababoy', 'bababoy@gmail.com', '$2y$10$LNiyBfx98J4lv3RuJE6GY.fsS2IkCM8/j8zWFXhl.u2w9gxKdKgD6', 'faculty'),
(14, 'ladyboy', 'ladyboy@gmail.com', '$2y$10$DugWvmxHqoQaMaSnL0jMMe1W7a7uZtCjqI4cfFRM2gU2YdIUncuh6', 'faculty'),
(15, 'witanapin', 'witanapin@gmail.com', '$2y$10$pkrsWu9cjiClGTixp9JwFedaix9HMWw8UfzWvU5HRlnNLW14OFkre', 'student'),
(16, 'uwauwa', 'uwauwa@gmail.com', '$2y$10$BglejHLUZeL1owAE/FMxCOrP.DOfaCg7PH61Jvsg0RZRUKhTdQ.n2', 'student'),
(17, 'buguk', 'buguk@gmail.com', '$2y$10$wHPQhzzmqT4YOhQruRJVgupyXoe.cLK7uYRa/dO1mk5rfHpslWsf2', 'student'),
(18, 'animal', 'animal@gmail.com', '$2y$10$jpU6uBVINRYFS4SBR4339eyNRNwk2WbJOZkgkadCmGimdRSOUT612', 'student'),
(19, 'lintik', 'lintik@gmail.com', '$2y$10$VCkFkpNV7MbWinTI9szFvuL7jCWazdg9AlNRK..k9ziPNRNFyg0M.', 'student'),
(20, 'wiwi', 'wiwi@gmail.com', '$2y$10$HJXbxkzqcy/z/CPTPBq6beS/..oam3ih.vfFYcGgjU1fHDl2QhGpC', 'student'),
(21, 'atutmabuluk', 'atutmabuluk@gmai.com', '$2y$10$TgyX08k/FCU64mRLpge/QuGu4VwiLdTcBz59DNMnfSWSNp6YLincK', 'student'),
(22, 'arco', 'arco@gmail.com', '$2y$10$.xe3.h6huI2RqE6PnYivN.VPzvImB2116CqQg/cmN08p4CKQlRSpu', 'student');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `register`
--
ALTER TABLE `register`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `register`
--
ALTER TABLE `register`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

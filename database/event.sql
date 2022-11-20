-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 18-Nov-2022 às 02:32
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `event`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `cdslocal`
--

CREATE TABLE `cdslocal` (
  `id` int(11) NOT NULL,
  `endereco` varchar(100) NOT NULL,
  `dia` varchar(10) NOT NULL,
  `hora` varchar(10) NOT NULL,
  `cpf` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `cdslocal`
--

INSERT INTO `cdslocal` (`id`, `endereco`, `dia`, `hora`, `cpf`) VALUES
(15, 'Rua AntÃ´nio pereira garcia, 117', '10-01-2023', '09:00HS', '490.401.288-71');

-- --------------------------------------------------------

--
-- Estrutura da tabela `eventos`
--

CREATE TABLE `eventos` (
  `ID` int(11) NOT NULL,
  `titulo` varchar(30) NOT NULL,
  `descricao` varchar(200) NOT NULL,
  `cover` varchar(500) NOT NULL,
  `cpf` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `eventos`
--

INSERT INTO `eventos` (`ID`, `titulo`, `descricao`, `cover`, `cpf`) VALUES
(43, 'Evento presencial', ' O excÃªntrico magizoologista Newt Scamander (Eddie Redmayne) chega Ã  cidade de Nova York levando com muito zelo sua preciosa maleta, um objeto mÃ¡gico onde ele carrega fantÃ¡sticos animais do mundo ', 'https://www.clickriomafra.com.br/emacite/wp-content/uploads/2016/12/Animais-Fant%C3%A1sticos-e-onde-Habitam.jpg', '490.401.288-71');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `cdslocal`
--
ALTER TABLE `cdslocal`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cdslocal`
--
ALTER TABLE `cdslocal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de tabela `eventos`
--
ALTER TABLE `eventos`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-09-2021 a las 03:10:00
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.2.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `restaurantejenga`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `CodigoCliente` int(8) NOT NULL,
  `NombreCliente` varchar(32) NOT NULL,
  `TelefonoCliente` varchar(16) NOT NULL,
  `DireccionCliente` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`CodigoCliente`, `NombreCliente`, `TelefonoCliente`, `DireccionCliente`) VALUES
(1, 'Maria Belen Ceron', '0997702037', 'Playa Chica'),
(2, 'Elian Llorente', '0998878765', 'Conocoto'),
(3, 'David Ceron', '0997709081', 'Av. Rio Zamora y Acceso 5'),
(4, 'Jose Cifuentes', '0998878765', 'New York'),
(5, 'Carmen Naunay', '0997702030', 'Playa Chica'),
(7, 'Carmen Ceron', '0997702038', 'Conocoto Alto'),
(9, 'Wilson Ceron', '0991915352', 'Playa Chica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallepedido`
--

CREATE TABLE `detallepedido` (
  `CodigoDetallePedido` int(8) NOT NULL,
  `Codigo_Pedido` int(8) NOT NULL,
  `Codigo_Cliente` int(8) NOT NULL,
  `Codigo_Producto` int(8) NOT NULL,
  `CantidadDetallePedido` varchar(8) NOT NULL,
  `TotalDetallePedido` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `detallepedido`
--

INSERT INTO `detallepedido` (`CodigoDetallePedido`, `Codigo_Pedido`, `Codigo_Cliente`, `Codigo_Producto`, `CantidadDetallePedido`, `TotalDetallePedido`) VALUES
(1, 1, 1, 1, '1', '15'),
(2, 1, 1, 4, '2', '6'),
(3, 6, 3, 2, '2', '30'),
(4, 6, 3, 1, '1', '15'),
(5, 6, 3, 3, '1', '4'),
(6, 7, 9, 6, '1', '3'),
(7, 7, 9, 5, '1', '15'),
(8, 8, 7, 6, '1', '3'),
(9, 8, 7, 5, '1', '15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `CodigoPedido` int(8) NOT NULL,
  `Codigo_Cliente` int(8) NOT NULL,
  `FechaPedido` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`CodigoPedido`, `Codigo_Cliente`, `FechaPedido`) VALUES
(1, 1, '30/8/2021'),
(2, 3, '6/9/2021'),
(5, 3, '6/9/2021'),
(6, 3, '6/9/2021'),
(7, 9, '6/9/2021'),
(8, 7, '6/9/2021');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `CodigoProducto` int(8) NOT NULL,
  `NombreProducto` varchar(32) NOT NULL,
  `DetalleProducto` varchar(64) NOT NULL,
  `PrecioProducto` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`CodigoProducto`, `NombreProducto`, `DetalleProducto`, `PrecioProducto`) VALUES
(1, 'Pizza Tradicional', 'Salsa de la casa, queso mozzarella, salami, pimientos y champiño', '15'),
(2, 'Pizza Hawaiana', 'Salsa de la casa, queso mozzarella, jamón y piña', '15'),
(3, 'Lasaña de res', 'Salsa de la casa, pasta fresca artesanal, salsa boloñesa, salsa ', '4'),
(4, 'Nachos', 'Nachos con carne molida y queso mozzarella', '3'),
(5, 'Pizza BBQ', 'Salsa de la casa, queso mozzarella, salchichas, tocino y salsa B', '15'),
(6, 'Pan de ajo', 'El pan de ajo consiste típicamente en pan cubierto con ajo y ace', '2.50');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`CodigoCliente`);

--
-- Indices de la tabla `detallepedido`
--
ALTER TABLE `detallepedido`
  ADD PRIMARY KEY (`CodigoDetallePedido`),
  ADD KEY `Codigo_Pedido` (`Codigo_Pedido`),
  ADD KEY `Codigo_Cliente` (`Codigo_Cliente`),
  ADD KEY `Codigo_Producto` (`Codigo_Producto`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`CodigoPedido`),
  ADD KEY `Codigo_Cliente` (`Codigo_Cliente`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`CodigoProducto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `CodigoCliente` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `detallepedido`
--
ALTER TABLE `detallepedido`
  MODIFY `CodigoDetallePedido` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `CodigoPedido` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `CodigoProducto` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detallepedido`
--
ALTER TABLE `detallepedido`
  ADD CONSTRAINT `detallepedido_ibfk_1` FOREIGN KEY (`Codigo_Pedido`) REFERENCES `pedido` (`CodigoPedido`) ON UPDATE CASCADE,
  ADD CONSTRAINT `detallepedido_ibfk_2` FOREIGN KEY (`Codigo_Cliente`) REFERENCES `cliente` (`CodigoCliente`) ON UPDATE CASCADE,
  ADD CONSTRAINT `detallepedido_ibfk_3` FOREIGN KEY (`Codigo_Producto`) REFERENCES `producto` (`CodigoProducto`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`Codigo_Cliente`) REFERENCES `cliente` (`CodigoCliente`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

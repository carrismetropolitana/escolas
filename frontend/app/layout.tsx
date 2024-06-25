//
// ROOT LAYOUT

import '@/styles/reset.css';
import '@/styles/defaults.css';
import '@/styles/colors.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Inter } from 'next/font/google';
import Providers from './providers';
import { ColorSchemeScript } from '@mantine/core';
import React from 'react';
import { Notifications } from '@mantine/notifications';

const inter = Inter({
	weight: ['400', '500', '600', '700', '800'],
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap',
});

export const metadata = {
	title: 'Carris Metropolitana',
	description: 'Escolas servidas pela Carris Metropolitana',
};

export default function RootLayout({ children }:{ children: React.ReactNode }) {
	return (
		<html className={inter.variable}>
			<head>
				<ColorSchemeScript />
				<link rel='shortcut icon' href='/favicon.svg' />
			</head>
			<body>
				<Providers>
					<Notifications />
					{children}
				</Providers>
			</body>
		</html>
	);
}
/* eslint-disable */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _|
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|

=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useState } from 'react';
import { Auth } from "aws-amplify";
// Chakra imports
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Icon,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useColorModeValue
} from '@chakra-ui/react';
// Custom components
import DefaultAuthLayout from 'layouts/auth/Default';
// Assets
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import Router from 'next/router';

export default function SignIn() {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [code, setCode] = useState("");
	const [verifying, setVerifying] = useState(false);

	// Chakra color mode
	const textColor = useColorModeValue('navy.700', 'white');
	const textColorSecondary = 'gray.400';
	const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
	const textColorBrand = useColorModeValue('brand.500', 'white');
	const brandStars = useColorModeValue('brand.500', 'brand.400');
	const googleBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.200');
	const googleText = useColorModeValue('navy.700', 'white');
	const googleHover = useColorModeValue({ bg: 'gray.200' }, { bg: 'whiteAlpha.300' });
	const googleActive = useColorModeValue({ bg: 'secondaryGray.300' }, { bg: 'whiteAlpha.200' });
	const [ show, setShow ] = React.useState(false);
	const handleClick = () => setShow(!show);
	return (
		<DefaultAuthLayout illustrationBackground={'/img/auth/auth.png'}>
			<Flex
				maxW={{ base: '100%', md: 'max-content' }}
				w='100%'
				mx={{ base: 'auto', lg: '0px' }}
				me='auto'
				h='100%'
				alignItems='start'
				justifyContent='center'
				mb={{ base: '30px', md: '60px' }}
				px={{ base: '25px', md: '0px' }}
				mt={{ base: '40px', md: '14vh' }}
				flexDirection='column'>
				<Box me='auto'>
					<Heading color={textColor} fontSize='36px' mb='10px'>
						Sign Up
					</Heading>
					<Text mb='36px' ms='4px' color={textColorSecondary} fontWeight='400' fontSize='md'>
						Enter your email and password to sign up!
					</Text>
				</Box>
				<Flex
					zIndex='2'
					direction='column'
					w={{ base: '100%', md: '420px' }}
					maxW='100%'
					background='transparent'
					borderRadius='15px'
					mx={{ base: 'auto', lg: 'unset' }}
					me='auto'
					mb={{ base: '20px', md: 'auto' }}>
					<FormControl>
						<FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
							Email<Text color={brandStars}>*</Text>
						</FormLabel>
						<Input
							onChange={(e) => setEmail(e.target.value)}
							isRequired={true}
							variant='auth'
							fontSize='sm'
							ms={{ base: '0px', md: '0px' }}
							type='email'
							placeholder='mail@simmmple.com'
							mb='24px'
							fontWeight='500'
							size='lg'
						/>
						<FormLabel ms='4px' fontSize='sm' fontWeight='500' color={textColor} display='flex'>
							Password<Text color={brandStars}>*</Text>
						</FormLabel>
						<InputGroup size='md'>
							<Input
								onChange={(e) => setPassword(e.target.value)}
								isRequired={true}
								fontSize='sm'
								placeholder='Min. 8 characters'
								mb='24px'
								size='lg'
								type={show ? 'text' : 'password'}
								variant='auth'
							/>
							{verifying && (
								<input
									type="text"
									placeholder="code"
									onChange={(e) => setCode(e.target.value)}
								/>
							)}
							<InputRightElement display='flex' alignItems='center' mt='4px'>
								<Icon
									color={textColorSecondary}
									_hover={{ cursor: 'pointer' }}
									as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
									onClick={handleClick}
								/>
							</InputRightElement>
						</InputGroup>
						<Button fontSize='sm' variant='brand' fontWeight='500' w='100%' h='50' mb='24px'
										onClick={() => {
											if (verifying) {
												Auth.confirmSignUp(email, code).then(() => {
													Router.push('/auth/sign-in')
												});
											} else {
												Auth.signUp({
													username: email,
													password,
												})
													.then(() => {
														setVerifying(true);
													})
													.catch((e) => alert(e));
											}
										}}
						>
							Register
						</Button>
					</FormControl>
				</Flex>
			</Flex>
		</DefaultAuthLayout>
	);
}

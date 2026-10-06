'use client';

import { Box, Button, chakra, VStack } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import COLORS from '@/assets/colors';
import FONTS, { montserrat } from '@/assets/fonts';
import { Text } from '@/components/core/text';
import { TextInput } from '@/components/core/text-input';
import { login } from '@/services/auth';
import { type LoginValues, validateLogin } from '@/utils/validations/login-schema';

export default function Login() {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);

  

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      setLoginError(null);
      router.push('/admin/(protected)/bookings');
    },
    onError: (error) => {
      setLoginError(
        error.message === 'auth_unavailable'
          ? 'Sign-in is unavailable right now. Please try again later.'
          : 'Invalid email or password.',
      );
    },
  });

  const onSubmit = (values: LoginValues) => {
    setLoginError(null);
    mutation.mutate(values);
  };

  const formik = useFormik<LoginValues>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit,
    validate: validateLogin,
  });

  return (
    <Box
      className={montserrat.className}
      minH="100vh"
      bg={COLORS.Bg.Brand}
      px="24px"
      py="80px"
    >
      <chakra.form onSubmit={formik.handleSubmit} maxW="360px" mx="auto" mt="10vh">
        <VStack align="stretch" gap="48px">
          <VStack gap="14px">
            <Box letterSpacing=".44em" textTransform="uppercase" pl=".44em">
              <Text font={FONTS.T1.T30px.Light}>Maryama</Text>
            </Box>
            <Box letterSpacing=".34em" textTransform="uppercase" opacity={0.5}>
              <Text font={FONTS.T1.T9px.Regular}>Admin</Text>
            </Box>
          </VStack>

          <VStack align="stretch" gap="28px">
            <TextInput
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={!!formik.errors.email && formik.touched.email}
              error={formik.errors.email}
            />
            <TextInput
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={!!formik.errors.password && formik.touched.password}
              error={formik.errors.password}
            />
          </VStack>

          {loginError && (
            <Text font={FONTS.T1.T12px.Light} color={COLORS.Text.FgError}>
              {loginError}
            </Text>
          )}

          <Button
            type="submit"
            loading={mutation.isPending}
            h="52px"
            borderRadius="0"
            bg={COLORS.Bg.Inverted}
            color={COLORS.Text.FgInverted}
            _hover={{ opacity: 0.85 }}
          >
            <Box letterSpacing=".3em" textTransform="uppercase">
              <Text font={FONTS.T1.T10px.Regular} color={COLORS.Text.FgInverted}>
                Sign in
              </Text>
            </Box>
          </Button>
        </VStack>
      </chakra.form>
    </Box>
  );
}

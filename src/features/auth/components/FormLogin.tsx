import { TextInput, PasswordInput, Button, Alert, Paper, Text, Title } from '@mantine/core';
import { IconArrowRight, IconLock, IconMail, IconAlertCircle } from '@tabler/icons-react';
import type { FormEvent } from 'react';

type FormLoginProps = {
  email: string;
  password: string;
  isSubmitting: boolean;
  errorMessage: string | null;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const FormLogin = ({
  email,
  password,
  isSubmitting,
  errorMessage,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: FormLoginProps) => {
  return (
    <Paper className="flex h-full flex-col justify-center p-6 sm:p-8" radius={0} bg="transparent">
      <div className="mb-8">
        <Text size="sm" fw={500} tt="uppercase" ls="0.16em" c="teal.7">
          Dashboard
        </Text>
        <Title order={2} mt="xs" c="dark.9">
          Masuk Portal
        </Title>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <TextInput
          label="Email"
          placeholder="Masukkan email Anda"
          leftSection={<IconMail size={18} className="text-neutral-500" />}
          value={email}
          onChange={(event) => onEmailChange(event.currentTarget.value)}
          type="email"
          required
          size="md"
          classNames={{ input: 'focus:border-teal-600' }}
        />

        <PasswordInput
          label="Password"
          placeholder="Masukkan password Anda"
          leftSection={<IconLock size={18} className="text-neutral-500" />}
          value={password}
          onChange={(event) => onPasswordChange(event.currentTarget.value)}
          required
          size="md"
          classNames={{ input: 'focus:border-teal-600' }}
        />

        {errorMessage && (
          <Alert icon={<IconAlertCircle size={16} />} title="Gagal Masuk" color="red" variant="light" mt="sm">
            {errorMessage}
          </Alert>
        )}

        <Button
          type="submit"
          loading={isSubmitting}
          rightSection={<IconArrowRight size={18} />}
          color="teal.7"
          size="md"
          mt="md"
          fullWidth
        >
          Masuk
        </Button>
      </form>
    </Paper>
  );
};
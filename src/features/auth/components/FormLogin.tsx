import { IconArrowRight, IconLock, IconUser } from '@tabler/icons-react';
import type { FormEvent } from 'react';

type FormLoginProps = {
  username: string;
  password: string;
  isSubmitting: boolean;
  errorMessage: string | null;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export const FormLogin = ({
  username,
  password,
  isSubmitting,
  errorMessage,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}: FormLoginProps) => {
  return (
    <form onSubmit={onSubmit} className="p-6 sm:p-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-emerald-700">
          Dashboard
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-neutral-950">
          Masuk Portal
        </h2>
      </div>

      <label className="mt-8 block text-sm font-medium text-neutral-700">
        Username
        <span className="mt-2 flex h-11 items-center gap-3 rounded-md border border-neutral-300 bg-white px-3 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100">
          <IconUser size={18} className="text-neutral-500" />
          <input
            className="h-full flex-1 border-0 bg-transparent text-sm outline-none"
            value={username}
            onChange={(event) => onUsernameChange(event.target.value)}
            type="text"
          />
        </span>
      </label>

      <label className="mt-4 block text-sm font-medium text-neutral-700">
        Password
        <span className="mt-2 flex h-11 items-center gap-3 rounded-md border border-neutral-300 bg-white px-3 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100">
          <IconLock size={18} className="text-neutral-500" />
          <input
            className="h-full flex-1 border-0 bg-transparent text-sm outline-none"
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            type="password"
          />
        </span>
      </label>

      {errorMessage ? (
        <p className="mt-4 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {errorMessage}
        </p>
      ) : null}

      <button
        className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? 'Memproses...' : 'Masuk'}
        <IconArrowRight size={18} />
      </button>
    </form>
  );
};

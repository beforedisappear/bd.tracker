// Toaster.test.tsx
import { render, screen } from '@testing-library/react';
import { Toaster } from './Toaster';
import { toast } from 'sonner';
import '@testing-library/jest-dom';

jest.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark' }),
}));

describe('Toaster with Toasts ui components', () => {
  it('renders toast when toast() is called', async () => {
    const testMessage = 'Test toast';

    render(<Toaster />);

    toast(testMessage);

    expect(await screen.findByText(testMessage)).toBeInTheDocument();
  });

  it('renders success toast', async () => {
    const successMessage = 'Success message';

    render(<Toaster />);

    toast.success(successMessage);

    expect(await screen.findByText(successMessage)).toBeInTheDocument();
  });

  it('renders error toast', async () => {
    const errorMessage = 'Error message';

    render(<Toaster />);

    toast.error(errorMessage);

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  it('renders toast with description', async () => {
    const title = 'Title';
    const description = 'Description text';
    render(<Toaster />);

    toast(title, { description });

    expect(await screen.findByText(title)).toBeInTheDocument();
    expect(await screen.findByText(description)).toBeInTheDocument();
  });
});

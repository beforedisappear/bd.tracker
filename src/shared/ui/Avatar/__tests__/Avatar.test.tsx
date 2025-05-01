import { render, screen } from '@testing-library/react';
import { Avatar } from '../Avatar';

const defaultAvatarProps = {
  src: './mocks/avatar.png',
  alt: 'User avatar',
};

describe('Avatar ui component', () => {
  // it('should render with required props', async () => {
  //   render(<Avatar {...defaultAvatarProps} />);
  //   const image = screen.getByRole('img');
  //   expect(image).toBeInTheDocument();
  //   expect(image).toHaveAttribute('src', defaultAvatarProps.src);
  //   expect(image).toHaveAttribute('alt', defaultAvatarProps.alt);
  // });
  // it('should render with custom className', () => {
  //   const className = 'custom-avatar';
  //   render(<Avatar {...defaultAvatarProps} className={className} />);
  //   const container = screen.getByRole('img').parentElement;
  //   expect(container).toHaveClass(className);
  // });
  // it('should render fallback when provided', () => {
  //   const fallback = 'JD';
  //   render(<Avatar {...defaultAvatarProps} fallback={fallback} />);
  //   expect(screen.getByText(fallback)).toBeInTheDocument();
  // });
  // it('should not render fallback when not provided', () => {
  //   render(<Avatar {...defaultAvatarProps} />);
  //   const fallback = screen.queryByText('JD');
  //   expect(fallback).not.toBeInTheDocument();
  // });
  // it('should handle image load error', () => {
  //   const fallback = 'JD';
  //   render(<Avatar {...defaultAvatarProps} fallback={fallback} />);
  //   const image = screen.getByRole('img');
  //   image.dispatchEvent(new Event('error'));
  //   expect(screen.getByText(fallback)).toBeVisible();
  // });
});

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputOTP } from './InputOTP';
import { FormProvider, useForm } from 'react-hook-form';
import { useEffect } from 'react';

// Mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      test: '',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('InputOTP ui component', () => {
  const defaultProps = {
    name: 'test',
    length: 4,
  };

  it('renders input with label', () => {
    const label = 'Test Label';
    render(
      <TestWrapper>
        <InputOTP {...defaultProps} label={label} />
      </TestWrapper>,
    );

    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  it('renders input with description', () => {
    const description = 'Test Description';
    render(
      <TestWrapper>
        <InputOTP {...defaultProps} description={description} />
      </TestWrapper>,
    );

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('renders correct number of input slots', () => {
    const length = 6;
    render(
      <TestWrapper>
        <InputOTP {...defaultProps} length={length} />
      </TestWrapper>,
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('maxlength', length.toString());
  });

  // it('renders with correct group size', () => {
  //   const length = 8;
  //   const groupSize = 4;
  //   render(
  //     <TestWrapper>
  //       <InputOTP {...defaultProps} length={length} groupSize={groupSize} />
  //     </TestWrapper>,
  //   );

  //   const groups = screen.getAllByRole('group');
  //   expect(groups).toHaveLength(2); // 8 digits divided into 2 groups of 4
  // });

  // it('handles input changes', async () => {
  //   const onChange = jest.fn();
  //   render(
  //     <TestWrapper>
  //       <InputOTP {...defaultProps} onChange={onChange} />
  //     </TestWrapper>,
  //   );

  //   const inputs = screen.getAllByRole('textbox');
  //   await userEvent.type(inputs[0], '1');
  //   await userEvent.type(inputs[1], '2');
  //   await userEvent.type(inputs[2], '3');
  //   await userEvent.type(inputs[3], '4');

  //   expect(onChange).toHaveBeenCalled();
  //   expect(inputs[0]).toHaveValue('1');
  //   expect(inputs[1]).toHaveValue('2');
  //   expect(inputs[2]).toHaveValue('3');
  //   expect(inputs[3]).toHaveValue('4');
  // });

  // it('handles disabled state', () => {
  //   render(
  //     <TestWrapper>
  //       <InputOTP {...defaultProps} disabled />
  //     </TestWrapper>,
  //   );

  //   const inputs = screen.getAllByRole('textbox');
  //   inputs.forEach(input => {
  //     expect(input).toBeDisabled();
  //   });
  // });

  // it('shows validation error', async () => {
  //   const TestWrapperWithError = ({
  //     children,
  //   }: {
  //     children: React.ReactNode;
  //   }) => {
  //     const methods = useForm({
  //       defaultValues: {
  //         test: '',
  //       },
  //     });

  //     useEffect(() => {
  //       methods.setError('test', {
  //         type: 'required',
  //         message: 'This field is required',
  //       });
  //     }, [methods]);

  //     return <FormProvider {...methods}>{children}</FormProvider>;
  //   };

  //   render(
  //     <TestWrapperWithError>
  //       <InputOTP {...defaultProps} />
  //     </TestWrapperWithError>,
  //   );

  //   await waitFor(() => {
  //     const errorMessage = screen.getByText('This field is required');
  //     expect(errorMessage).toBeInTheDocument();
  //   });
  // });

  // it('throws error for invalid length', () => {
  //   const consoleError = jest
  //     .spyOn(console, 'error')
  //     .mockImplementation(() => {});

  //   expect(() => {
  //     render(
  //       <TestWrapper>
  //         <InputOTP {...defaultProps} length={0} />
  //       </TestWrapper>,
  //     );
  //   }).toThrow('groupSize и separatorStep can only be positive');

  //   consoleError.mockRestore();
  // });

  // it('throws error for invalid group size', () => {
  //   const consoleError = jest
  //     .spyOn(console, 'error')
  //     .mockImplementation(() => {});

  //   expect(() => {
  //     render(
  //       <TestWrapper>
  //         <InputOTP {...defaultProps} groupSize={0} />
  //       </TestWrapper>,
  //     );
  //   }).toThrow('groupSize и separatorStep can only be positive');

  //   consoleError.mockRestore();
  // });
});

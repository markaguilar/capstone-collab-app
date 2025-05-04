interface Props {
  messages: string | undefined;
}

const ErrorMessages = ({ messages }: Props) => {
  return <span className="text-red-500 text-sm mt-2">{messages}</span>;
};

export default ErrorMessages;

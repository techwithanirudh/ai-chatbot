import { CheckCircleFillIcon as IconCheckCircle } from '@/components/icons';

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
      <IconCheckCircle size={16} />
      <p>{message}</p>
    </div>
  );
};

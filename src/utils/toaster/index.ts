import { useToast } from "vue-toastification";

const toast = useToast();

export const showErrorToast = (text: string) =>
  toast.error(text, { toastClassName: "toaster-error" });

export const showSuccessToast = (text: string) => {
  toast.success(text);
};

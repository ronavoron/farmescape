import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Для владельцев ферм</DialogTitle>
        </DialogHeader>

        <p className="text-stone-600">
          FarmEscape — учебный прототип. Регистрация ферм
          и личный кабинет пока недоступны.
        </p>

        <Button
          className="bg-lime-900 hover:bg-lime-950"
          onClick={onClose}
        >
          Понятно
        </Button>
      </DialogContent>
    </Dialog>
  );
};
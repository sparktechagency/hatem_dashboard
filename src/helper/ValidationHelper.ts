import toast from "react-hot-toast";

class ValidationHelper { 
    SuccessToast(msg: string){
        toast.success(msg);
    }

    ErrorToast(msg:string){
        toast.error(msg);
    }

    WarningToast(msg: string) {
        toast(msg, {
            style: {
                background: '#FFFBEB',
                color: '#D97706',
                border: '1px solid #FBBF24',
            },
            icon: '⚠️',
        });
    };
}

export const { SuccessToast, ErrorToast, WarningToast } = new ValidationHelper();
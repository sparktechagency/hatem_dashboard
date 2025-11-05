import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import DeleteButton from "@/components/form/DeleteButton"
import { useEffect, useState } from "react"
import { useChangeStatusMutation } from "@/redux/features/auth/authApi"
import { MdOutlineBlock } from "react-icons/md";
import { BsFillStopCircleFill } from "react-icons/bs";
import { Clock } from "lucide-react"

type TProps = {
  userId : string;
  status: string;
}

const ChangeStatusModal = ({ userId, status }: TProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [changeStatus, { isLoading, isSuccess }] = useChangeStatusMutation();

  useEffect(() => {
    if (!isLoading) {
      setModalOpen(false);
    }
  }, [isLoading, isSuccess]);

  const handleClick = () =>  {
    changeStatus(userId)
  }

  return (
    <>
          {
              status === "PENDING" ? (
                  <>
                      <button
                          className={`inline-flex items-center gap-2 px-4 py-1 rounded-2xl font-medium transition-all shadow-sm focus:outline-none cursor-not-allowed bg-gray-100 text-gray-700 hover:bg-gray-100 focus:ring-gray-300
                              `}
                      >
                          <Clock className="w-4 h-4" />
                          <span>Pending</span>
                      </button>
                  </>
              ) : (
                  <>
                      <button
                          onClick={() => setModalOpen(true)}
                          className={`inline-flex items-center gap-2 px-4 py-1 rounded-2xl font-medium transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer ${status != "ACTIVE"
                              ? "bg-red-50 text-red-700 hover:bg-red-100 focus:ring-red-300"
                              : "bg-green-50 text-green-700 hover:bg-green-100 focus:ring-green-300"
                              }`}
                      >
                          {status != "ACTIVE" ? (
                              <>
                                  <MdOutlineBlock className="w-4 h-4" />
                                  <span>Blocked</span>
                              </>
                          ) : (
                              <>
                                  <BsFillStopCircleFill className="w-4 h-4" />
                                  <span>Active</span>
                              </>
                          )}
                      </button>
                  </>
              )
          }
      

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()} showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Are you sure, you want to delete?</DialogTitle>
          </DialogHeader>

          <div className="flex justify-end gap-2">
            <Button variant="default" className="bg-black hover:bg-black/80" onClick={() => setModalOpen(false)}>
              No
            </Button>
           <DeleteButton onClick={handleClick} isLoading={isLoading}/>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ChangeStatusModal
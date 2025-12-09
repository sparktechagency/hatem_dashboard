import { useState } from "react";
import { Reply } from "lucide-react";
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useReplyContactMutation } from "@/redux/features/contact/contactApi";
import { ErrorToast } from "@/helper/ValidationHelper";

type TProps = {
   contactId: string;
};

const ReplyModal = ({ contactId }: TProps) => {
   const [modalOpen, setModalOpen] = useState(false);
   const [replyMessage, setReplyMessage] = useState("");

   const [reply] = useReplyContactMutation();

   console.log(contactId);

   const handleSubmit = async () => {
      // Add your API call here
      console.log("submitted for:", { contactId, replyMessage });

      if (replyMessage.trim() === "" || !replyMessage) {
         ErrorToast("Reply message cannot be empty!");
         return;
      }

      if (!contactId) {
         ErrorToast("ContactId is required!");
         return;
      }

      try {
         const res = await reply({
            id: contactId,
            data: {
               userId: contactId,
               message: replyMessage,
            },
         }).unwrap();

         if (res?.success) {
            setReplyMessage("");
         } else {
            ErrorToast(res?.message || "Failed to send reply.");
         }
      } catch (err) {}

      setModalOpen(false);
   };

   return (
      <>
         <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            {/* Trigger Button */}
            <DialogTrigger asChild>
               <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer p-2 text-white rounded-full">
                  <Reply size={18} />
               </button>
            </DialogTrigger>

            {/* Modal */}
            <DialogContent className="sm:max-w-md">
               <DialogHeader>
                  <DialogTitle>Reply Message</DialogTitle>
               </DialogHeader>

               <div className="space-y-2 mt-2">
                  <Label
                     htmlFor="question"
                     className="text-sm font-medium text-foreground"
                  >
                     Message
                  </Label>
                  <Textarea
                     value={replyMessage}
                     onChange={(e) => setReplyMessage(e.target.value)}
                     id="question"
                     placeholder="Write a reply..."
                     className="min-h-[80px] resize-y"
                  />
               </div>

               <DialogFooter>
                  <Button
                     onClick={handleSubmit}
                     className="w-full bg-cyan-600 hover:bg-cyan-700 text-white"
                  >
                     Submit
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </>
   );
};

export default ReplyModal;

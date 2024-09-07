// // components/forms/NewCommentForm.tsx
// "use client";
//
// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { SendHorizontal } from "lucide-react";
// import { CreateNewComment } from "@/lib/actions/qoute.action";
//
// interface NewCommentFormProps {
//   onNewComment: (comment: any) => void;
// }
//
// export function NewCommentForm({ onNewComment }: NewCommentFormProps) {
//   const [message, setMessage] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//
//   const onSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//
//     if (!message) {
//       return;
//     }
//
//     setLoading(true);
//
//     try {
//       const newComment = await CreateNewComment(
//         message,
//         "cm0mpbr6p000y6ld3zb7eimcl",
//       );
//       onNewComment(newComment);
//       setMessage("");
//     } catch (error) {
//       console.error("Error creating a new comment:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <div>
//       <form onSubmit={onSubmit} className="relative flex flex-1 flex-shrink-0">
//         <label htmlFor="message" className="sr-only">
//           Comment
//         </label>
//         <Input
//           className="h-14 py-[9px]"
//           name="message"
//           placeholder="Comment"
//           id="message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button type="submit" disabled={loading}>
//           <SendHorizontal className="hover:scale-150 transition-all duration-500 absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
//         </button>
//       </form>
//     </div>
//   );
// }

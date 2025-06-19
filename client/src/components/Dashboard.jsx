import React from "react";
import { useAuth } from "../contexts/AuthContext";
import Alert from "./Alert";
export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="">
      <Alert type="success" message="জীবননগর ডিগ্রি কলেজে আপনাকে স্বাগত!" />
      {!user.student && (
        <Alert
          type="warning"
          message="আপনি এখনো কোন ফরম পূরণ করেন নি। অর্থাৎ আপনি এখনো আমাদের কোন শিক্ষার্থী না। দয়াকরে Admission Form এ ক্লিক করে আপনার রেজিস্ট্রেশন কমপ্লিট করুন। অন্যথায় আপনার ইউজার প্যানেলটি আগামী একমাসের মধ্যে মুছে দেয়া হবে। ধন্যবাদ। "
        />
      )}
    </div>
  );
}

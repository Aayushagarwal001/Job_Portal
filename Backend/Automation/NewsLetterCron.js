import cron from "node-cron";
import { Job } from "../Models/JobSchema.js";
import { User } from "../Models/UserSchema.js";
import { sendEmail } from "../Utils/SendEmail.js";

// Function to send email notification to users about upcoming jobs

export const newsLetterCron = () => {
    cron.schedule("*/1 * * * *", async () => {
        console.log("running................. ");
        const jobs = await Job.find({newsLetterSent: false});

        for(const job of jobs) {
            try{
                const filteredUsers = await User.find({
                    $or:[
                        {"Fields.firstField": job.jobCategory},
                        {"Fields.secondField": job.jobCategory},
                        {"Fields.thirdField": job.jobCategory}
                    ]
                })

                for(const user of filteredUsers) {
                    const subject = `New Job Alert: ${job.title} at ${job.companyName} in ${job.jobCategory}`;
                    const message = 
                                    `Hi ${user.name},

We are excited to inform you about a new job opportunity that matches your interests in the field of ${job.jobCategory}!

Position:    ${job.title}
Company:     ${job.companyName}
Location:    ${job.location}
Job Type:    ${job.jobType}
Description: ${job.description}

Don't miss out on this opportunity! Visit our platform and apply today.

Best regards,
Quick Hire Team`;
    console.log("running.......123........ ");
                        sendEmail({
                            email: user.email,
                            subject,
                            message
                        });
                }
                job.newsLetterSent = true;
                await job.save();
            }catch(error){
                console.log("Error in finding job");
                return next(console.error(error || "Some error occured"));
            }
        }
   });
         
}
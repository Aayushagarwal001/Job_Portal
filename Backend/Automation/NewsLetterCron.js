// import cron from "node-cron";
// import { Job } from "../Models/JobSchema.js";
// import { User } from "../Models/UserSchema.js";
// import { sendEmail } from "../Utils/SendEmail.js";

// // Function to send email notification to users about upcoming jobs

// export const newsLetterCron = () => {
//     cron.schedule("*/1 * * * *", async () => {
//         console.log("running................. ");
//         const jobs = await Job.find({newsLetterSent: false});

//         for(const job of jobs) {
//             try{
//                 const filteredUsers = await User.find({
//                     $or:[
//                         {"Fields.firstField": job.jobCategory},
//                         {"Fields.secondField": job.jobCategory},
//                         {"Fields.thirdField": job.jobCategory}
//                     ]
//                 })

//                 for(const user of filteredUsers) {
//                     const subject = `New Job Alert: ${job.title} at ${job.companyName} in ${job.jobCategory}`;
//                     const message = 
//                                     `Hi ${user.name},

// We are excited to inform you about a new job opportunity that matches your interests in the field of ${job.jobCategory}!

// Position:    ${job.title}
// Company:     ${job.companyName}
// Location:    ${job.location}
// Job Type:    ${job.jobType}
// Description: ${job.description}

// Don't miss out on this opportunity! Visit our platform and apply today.
// Apply here: https://quickhire-portal.netlify.app
// Best regards,
// Quick Hire Team`;
//     console.log("running.......123........ ");
//                         sendEmail({
//                             email: user.email,
//                             subject,
//                             message
//                         });
//                 }
//                 job.newsLetterSent = true;
//                 await job.save();
//             }catch(error){
//                 console.log("Error in finding job");
//                 return next(console.error(error || "Some error occured"));
//             }
//         }
//    });
         
// }





import cron from "node-cron";
import { Job } from "../Models/JobSchema.js";
import { User } from "../Models/UserSchema.js";
import { sendEmail } from "../Utils/SendEmail.js";

// Function to send email notification to users about upcoming jobs
export const newsLetterCron = () => {
    cron.schedule("*/1 * * * *", async () => {
        console.log("Running job alert cron...");

        try {
            const jobs = await Job.find({ newsLetterSent: false });

            if (jobs.length === 0) {
                console.log("No new jobs found. Skipping email alerts.");
                return;
            }

            for (const job of jobs) {
                try {
                    // Find users matching the job category
                    const filteredUsers = await User.find({
                        $or: [
                            { "Fields.firstField": job.jobCategory },
                            { "Fields.secondField": job.jobCategory },
                            { "Fields.thirdField": job.jobCategory },
                        ],
                    });

                    if (filteredUsers.length === 0) {
                        console.log(`No users found for job category: ${job.jobCategory}`);
                        continue;
                    }

                    for (const user of filteredUsers) {
                        const subject = `New Job Alert: ${job.title} at ${job.companyName}`;
                        
                        const htmlMessage = `
                            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                                <h2 style="color: #0056b3;">New Job Alert: ${job.title} at ${job.companyName}</h2>
                                <p>Hi <strong>${user.name}</strong>,</p>
                                <p>We are excited to inform you about a new job opportunity that matches your interests in <strong>${job.jobCategory}</strong>!</p>
                                
                                <h3 style="color: #009688;">Job Details:</h3>
                                <ul>
                                    <li><strong>💼 Position:</strong> ${job.title}</li>
                                    <li><strong>🏢 Company:</strong> ${job.companyName}</li>
                                    <li><strong>📍 Location:</strong> ${job.location}</li>
                                    <li><strong>⏳ Job Type:</strong> ${job.jobType}</li>
                                    <li><strong>📝 Description:</strong> ${job.description}</li>
                                </ul>

                                <p style="margin: 20px 0;">Don't miss out on this opportunity! Click below to apply:</p>

                                <a href="https://quickhire-portal.netlify.app/jobs/${job._id}"
                                   style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px;">
                                   📝 Apply Now
                                </a>

                                <p style="margin-top: 20px;">Best regards,<br><strong>Quick Hire Team</strong></p>
                            </div>
                        `;

                        await sendEmail({
                            email: user.email,
                            subject,
                            message: `New job alert: ${job.title} at ${job.companyName}`,
                            html: htmlMessage,
                        });

                        console.log(`Email sent to ${user.email} for job ${job.title}`);
                    }

                    // Mark job as processed
                    job.newsLetterSent = true;
                    await job.save();
                } catch (error) {
                    console.error(`Error processing job ${job.title}:`, error);
                }
            }

            console.log("Job alert cron completed.");
        } catch (error) {
            console.error("Error in job alert cron:", error);
        }
    });
};

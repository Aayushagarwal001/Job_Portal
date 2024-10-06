import React from 'react';

const TopFields = () => {
    const jobFields = [
        {
            id: 1,
            service: 'Web Development',
            description: 'Design and build websites and web applications. Involves front-end, back-end, and full-stack development.'
        },
        {
            id: 2,
            service: 'Data Analysis',
            description: 'Analyze and interpret complex data to help organizations make informed decisions. Involves statistical analysis and data visualization.'
        },
        {
            id: 3,
            service: 'Graphic Design',
            description: 'Create visual content to communicate messages effectively. Includes logo design, branding, and digital illustrations.'
        },
        {
            id: 4,
            service: 'Digital Marketing',
            description: 'Promote products and services through digital channels such as social media, email, and search engines.'
        },
        {
            id: 5,
            service: 'Software Engineering',
            description: 'Develop, test, and maintain software applications and systems. Involves coding, debugging, and deploying software solutions.'
        },
        {
            id: 6,
            service: 'Project Management',
            description: 'Plan, execute, and oversee projects to ensure they are completed on time and within budget. Includes resource management and risk assessment.'
        },
        {
            id: 7,
            service: 'Customer Support',
            description: 'Assist customers with inquiries, issues, and feedback. Ensures customer satisfaction and resolves problems effectively.'
        },
        {
            id: 8,
            service: 'Content Writing',
            description: 'Create written content for websites, blogs, and marketing materials. Focuses on clear, engaging, and SEO-friendly writing.'
        },
        {
            id: 9,
            service: 'Human Resources',
            description: 'Manage employee relations, recruitment, and organizational development. Includes hiring, training, and performance management.'
        },

    ];
    
    return (

        <section className="services">
        <h3>Top Fields</h3>
        <div className="grid">
          {jobFields.map((element) => {
            return (
              <div className="card" key={element.id}>
                <h4>{element.service}</h4>
                <p>{element.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    );
  };

export default TopFields;




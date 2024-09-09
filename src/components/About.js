import React from 'react';

function About() {
  return (
    <div className="about-us-container container my-1 ">
      <header className="text-center mb-4">
        <h1>About Us</h1>
        <p className="lead">Discover who we are and what drives us.</p>
      </header>

      <section className="mb-5">
        <h2 className="text-primary">Welcome to iNotebook</h2>
        <p>
          At <strong>iNotebook</strong>, we believe that your thoughts and ideas deserve a secure and intuitive space to be organized. Our mission is to provide you with a platform that enhances your productivity while ensuring your data is safe and accessible only to you.
        </p>
      </section>

      <section className="mb-5">
        <h2 className="text-primary">What We Offer</h2>
        <div className="row">
          <div className="col-md-6">
            <h3>Secure Authentication</h3>
            <p>
              Our secure authentication system protects your account with advanced encryption, so you can log in with confidence knowing your information is safe.
            </p>
          </div>
          <div className="col-md-6">
            <h3>Effortless Note Management</h3>
            <p>
              Easily add, update, and delete notes. Our user-friendly interface ensures that managing your notes is straightforward and convenient.
            </p>
          </div>
          <div className="col-md-6">
            <h3>Reliable Cloud Storage</h3>
            <p>
              All your notes are securely stored in the cloud, making them accessible from any device while keeping your data safe from unauthorized access.
            </p>
          </div>
          <div className="col-md-6">
            <h3>Privacy First</h3>
            <p>
              We value your privacy. Each user has their own private space. Rest assured, your notes are visible only to you.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <h2 className="text-primary">Our Mission</h2>
        <p>
          Our mission is to deliver a secure and user-friendly platform that allows you to manage your notes with ease. We strive to enhance your productivity while ensuring the highest level of data security and privacy.
        </p>
      </section>

      <section className="mb-5">
        <h2 className="text-primary">Our Core Values</h2>
        <ul className="list-unstyled">
          <li><strong>Security:</strong> We are committed to safeguarding your information with robust security protocols to prevent unauthorized access.</li>
          <li><strong>Privacy:</strong> Your privacy is paramount. We do not share your personal information or notes with third parties.</li>
          <li><strong>User Experience:</strong> We focus on delivering an intuitive experience, ensuring that managing your notes is both easy and enjoyable.</li>
        </ul>
      </section>

      <section className="mb-5">
        <h2 className="text-primary">Contact Us</h2>
        <p>If you have any questions, feedback, or need assistance, feel free to reach out to us:</p>
        <ul className="list-unstyled">
          <li><strong>Email:</strong> <a href="mailto:areebahmed1018@gmail.com">areebahmed1018@gmail.com</a></li>
        </ul>
      </section>

      <footer className="text-center mb-5">
        <p><strong>Thank you for choosing iNotebook. We are thrilled to be part of your journey towards a more organized and productive life!</strong></p>
      </footer>
    </div>
  );
}

export default About;

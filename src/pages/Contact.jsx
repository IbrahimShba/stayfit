// JOB: contact form (it only shows a thank-you message, no server).
import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault(); // stop the page from reloading
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div className="row">
      <div className="col-12 col-md-7">
        <h1>Contact</h1>
        <p>Have a question or an idea? Send us a message.</p>
        {sent && <div className="alert alert-success">Message sent. Thank you!</div>}
        <form onSubmit={handleSubmit}>
          <label className="form-label">Name</label>
          <input className="form-control mb-3" required value={name}
            onChange={(e) => setName(e.target.value)} />
          <label className="form-label">Email</label>
          <input className="form-control mb-3" type="email" required value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <label className="form-label">Message</label>
          <textarea className="form-control mb-3" rows="4" required value={message}
            onChange={(e) => setMessage(e.target.value)} />
          <button className="btn btn-brand" type="submit">Send message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;

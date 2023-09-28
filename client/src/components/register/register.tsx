import React, {useEffect, useState, FormEvent} from 'react';
import {useParams} from "react-router-dom";
import {QRCodeSVG} from 'qrcode.react';

interface IMeetupServerObj {
  _id: string;
  title: string;
  date: Date;
  description?: string;
  image?: string;
}

interface IPaymentRequest {
  id: string;
  request: string;
}

const Register = () => {

  const {meetup_id} = useParams();

  const awaitPaymentRoute = '/api/attendees/await-payment';
  const meetupRoute = `/api/meetups/get-meetup/${meetup_id}`;
  const requestInvoiceRoute = '/api/attendees/request-invoice';

  const [invoicePaid, setInvoicePaid] = useState(false);
  const [meetupData, setMeetupData] = useState<IMeetupServerObj | null>(null);
  const [paymentRequest, setPaymentRequest] = useState<IPaymentRequest>({id: '', request: ''});
  const [loading, setLoading] = useState(false);

  const meetupAbortCtrl = new AbortController();
  const submitAbortCtrl = new AbortController();
  const checkAbortCtrl = new AbortController();

  interface FormData {
    name: string;
    email: string;
    meetup_id: string;
  }

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    meetup_id: meetup_id || ''
  });

  const awaitInvoicePayment = async (paymentRequestId: string) => {
    const payload = JSON.stringify({paymentRequestId});
    const headers = {"Content-Type": "application/json"};
    const postConfig = {method: 'POST', headers, body: payload, signal: submitAbortCtrl.signal}
    try {
      const response = await fetch(awaitPaymentRoute, postConfig);
      const data = await response.json();
      if (data.invoicePaid) {
        setInvoicePaid(true);
      } else {
        checkInvoice(paymentRequestId);
      }
    } catch (error) {
      console.log("FETCH ERROR", error);
    }
  }

  function checkInvoice(paymentRequestId: string) {
    setTimeout(() => {
      awaitInvoicePayment(paymentRequestId);
    }, 2100);
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Please provide your name and a valid email address");
      return;
    }
    const payload = JSON.stringify(formData);
    const headers = {"Content-Type": "application/json"};
    const postConfig = {method: 'POST', headers, body: payload, signal: submitAbortCtrl.signal}
    try {
      setLoading(true);
      const response = await fetch(requestInvoiceRoute, postConfig);
      const data = await response.json();
      setLoading(false);
      setPaymentRequest({id: data.invoice.id, request: data.invoice.request});
    } catch (error) {
      console.log("FETCH ERROR", error);
    }
  }

  useEffect(() => {
    async function fetchMeetup() {
      try {
        const response = await fetch(meetupRoute, {signal: meetupAbortCtrl.signal});
        const data = await response.json();
        data.meetup.date = new Date(data.meetup.date);
        setMeetupData(data.meetup);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMeetup();
    //
    return () => {
      console.log('unmount registration');
      meetupAbortCtrl.abort();
      submitAbortCtrl.abort();
      setMeetupData(null);
    };
  }, []);

  useEffect(() => {
    if (paymentRequest.id) {
      awaitInvoicePayment(paymentRequest.id);
    }
  }, [paymentRequest]);

  return (
      <div className="register">
        <h1>Register...</h1>
        <div className="meetup-details">
          <img src={meetupData?.image} alt=""/>
          <div className="title-date-desc">
            <p>{meetupData?.title}</p>
            <p>{meetupData?.date.toLocaleDateString()}</p>
            <p>{meetupData?.description}</p>
          </div>
        </div>
        <div className="submission-form">
          {loading && <div className="overlay">
            <div className="overlay__inner">
              <div className="overlay__content"><span className="spinner"></span></div>
            </div>
          </div>}
          {!loading && <>
            <form onSubmit={onSubmit}>
              <div className="labeled-input">
                <div className="labeled-input">
                  <label htmlFor="name">Name:</label>
                  <input name="name" type="text" autoComplete="off" value={formData.name}
                         onChange={onInputChange}/>
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input name="email" type="email" autoComplete="off" value={formData.email}
                         onChange={onInputChange}/>
                  <button>register!</button>
                </div>
              </div>
            </form>
            {paymentRequest.id && <div className="lightning-invoice">
              <div className="lightning-qr">
                <QRCodeSVG value={paymentRequest.request}/>
                <div className="lightning-invoice-copy">
                  <h3>Thanks so much for registering!</h3>
                  <p>Please pay the lightning invoice below to complete your registration.</p>
                  <p>{paymentRequest.request}</p>
                </div>
              </div>
              {invoicePaid && <div className="lightning-invoice-paid">
                <h2>Congrats! You're registered for <span>{meetupData?.title}</span></h2>
                <p>You should be receiving an email with your payment confirmation.</p>
                <p>Thank you kindly for joining the meetup.</p>
              </div>}
            </div>}
          </>}
        </div>
      </div>
  );
};

export default Register;

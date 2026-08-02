import './HowItWorks.css'

export default function HowItWorks() {
  return (
    <section className="how" id="how-it-works">
      <div className="container how__grid">
        <div className="how__copy">
          <p className="how__eyebrow">Setup</p>
          <h2 className="how__heading">Four fields. That's the whole setup.</h2>
          <p className="how__body">
            Tell Pulsecheck what to call and how often. It handles the scheduling,
            the retries, and the alerting — you just watch the results come in.
          </p>
          <ul className="how__list">
            <li><span>01</span> Paste the endpoint URL</li>
            <li><span>02</span> Choose the method — GET, POST, PUT, DELETE</li>
            <li><span>03</span> Add a request body, if the call needs one</li>
            <li><span>04</span> Set the interval — from every 10 seconds up</li>
          </ul>
        </div>

        <div className="how__mock" aria-hidden="true">
          <div className="mock">
            <p className="mock__title">New check</p>

            <label className="mock__field">
              <span>Endpoint URL</span>
              <div className="mock__input">https://api.yourapp.com/v1/orders</div>
            </label>

            <div className="mock__row">
              <label className="mock__field mock__field--small">
                <span>Method</span>
                <div className="mock__input mock__input--select">GET</div>
              </label>
              <label className="mock__field mock__field--small">
                <span>Interval</span>
                <div className="mock__input mock__input--select">60s</div>
              </label>
            </div>

            <label className="mock__field">
              <span>Request body (optional)</span>
              <div className="mock__input mock__input--code">{'{ }'}</div>
            </label>

            <div className="mock__submit">Start monitoring</div>
          </div>
        </div>
      </div>
    </section>
  )
}

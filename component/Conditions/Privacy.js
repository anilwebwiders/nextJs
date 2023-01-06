import React from 'react';
import PrivacyTable from './PrivacyTable';

const Privacy = () => {
    return (
        <div className='terms_condition'>
            <div className='container-fluid'>
            <div className="terms">
            <h5 className='terms-and-conditions__titel'>PRIVACY POLICY </h5>
            <h2 className='terms-and-conditions__titel__sub'>Last updated January 03, 2021 </h2>
            <br></br>
            <p>Thank you for choosing to be part of our community at FUTURE NOW MOTIVATION, LLC (“Company”, we”, us”, our”). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy policy, or our practices with regards to your personal information, please contact us at <a>support@fnmotivation.com.</a></p><br></br>
            <p>When you visit our website <a target="_blank" rel="noopener noreferrer"href="https://www.fnmotivation.com">https://www.fnmotivation.com</a> (the Website”), use our mobile application FNMotivation, as the case may be (the App) and more generally, use any of our services (the Services", which include the Website and App), we appreciate that you are trusting us with your personal information. We take your privacy very seriously. In this privacy policy, we seek to explain to you in the clearest way possible what information we collect, how we use it and what rights you have in relation to it. We hope you take some time to read through it carefully, as it is important. If there are any terms in this privacy policy that you do not agree with, please discontinue use of our services immediately.</p><br></br>
            <p>This privacy policy applies to all information collected through our Services (which, as described above, includes our Website and App), as well as any related services, sales, marketing or events. </p><br></br>
            <p></p><br></br>

            <p className='terms-and-conditions__titel__sub'>Please read this privacy policy carefully as it will help you understand what we do with the information that we collect.</p><br></br>

            <h5 className='table__of__contents__titel'>TABLE OF CONTENTS</h5><br></br>

            {/* <div id="accordion" className="myaccordion">
                           <div className="card">
                              <div className="card-header" id="headingOne">
                                <h2 className="mb-0">
                                  <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    1. WHAT INFORMATION DO WE COLLECT?
                                    <span className="fa-stack fa-sm">
                                        <i className="fa fa-stack-1x fa-inverse fa-minus"></i>
                                    </span>
                                  </button>
                                </h2>
                              </div>
                              <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion" >
                                <div className="card-body">
                                  <div className="table__of__contents__text">
                                      <p><span>In Short</span>: : We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</p>
                                      <ul>
                                          <li><span>Consent</span>: We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</li>
                                          <li><span>Legitimate Interests</span>: We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                                          <li><span>Performance of a Contract</span>: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
                                          <li><span>Legal Obligations</span>: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).</li>
                                          <li><span>Vital Interests</span>: We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.
                                            More specifically, we may need to process your data or share your personal information in the following situations:</li>
                                            <li><span>Business Transfers</span>: We may share or transfer your information in connection with or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business to another company.</li>
                                            <li><span>Affiliates</span>: We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us.</li>
                                            <li><span>Business Partners</span>: We may share your information with our business partners to offer you certain products, services or promotions.</li>
                                      </ul>
                                  </div>
                                </div>
                              </div>
                           </div>
                           <div className="card">
                              <div className="card-header" id="headingTwo">
                                <h2 className="mb-0">
                                  <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    2. HOW DO WE USE YOUR INFORMATION?
                                    <span className="fa-stack fa-2x">
                                        <i className="fa fa-plus fa-stack-1x fa-inverse"></i>
                                    </span>
                                  </button>
                                </h2>
                              </div>
                              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                <div className="card-body">
                                 <div className="table__of__contents__text">
                                    <p><span>In Short</span>: : We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</p>
                                    <ul>
                                        <li><span>Consent</span>: We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</li>
                                        <li><span>Legitimate Interests</span>: We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                                        <li><span>Performance of a Contract</span>: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
                                        <li><span>Legal Obligations</span>: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).</li>
                                        <li><span>Vital Interests</span>: We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.
                                          More specifically, we may need to process your data or share your personal information in the following situations:</li>
                                          <li><span>Business Transfers</span>: We may share or transfer your information in connection with or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business to another company.</li>
                                          <li><span>Affiliates</span>: We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us.</li>
                                          <li><span>Business Partners</span>: We may share your information with our business partners to offer you certain products, services or promotions.</li>
                                    </ul>
                                </div>
                                </div>
                              </div>
                           </div>
                           <div className="card">
                              <div className="card-header" id="headingThree">
                                <h2 className="mb-0">
                                  <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?
                                    <span className="fa-stack fa-2x">
                                      <i className="fas fa-stack-1x fa-inverse fa-plus"></i>
                                    </span>
                                  </button>
                                </h2>
                              </div>
                              <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion" >
                                <div className="card-body">
                                 <div className="table__of__contents__text">
                                    <p><span>In Short</span>: : We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</p>
                                    <ul>
                                        <li><span>Consent</span>: We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</li>
                                        <li><span>Legitimate Interests</span>: We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                                        <li><span>Performance of a Contract</span>: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
                                        <li><span>Legal Obligations</span>: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).</li>
                                        <li><span>Vital Interests</span>: We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.
                                          More specifically, we may need to process your data or share your personal information in the following situations:</li>
                                          <li><span>Business Transfers</span>: We may share or transfer your information in connection with or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business to another company.</li>
                                          <li><span>Affiliates</span>: We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us.</li>
                                          <li><span>Business Partners</span>: We may share your information with our business partners to offer you certain products, services or promotions.</li>
                                    </ul>
                                </div>
                                </div>
                              </div>
                           </div>
                           <div className="card">
                              <div className="card-header" id="heading4">
                                <h2 className="mb-0">
                                  <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapse4" aria-expanded="false" aria-controls="collapseThree">
                                    4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                                    <span className="fa-stack fa-2x">
                                      <i className="fas fa-stack-1x fa-inverse fa-plus"></i>
                                    </span>
                                  </button>
                                </h2>
                              </div>
                              <div id="collapse4" className="collapse" aria-labelledby="heading4" data-parent="#accordion" >
                                <div className="card-body">
                                 <div className="table__of__contents__text">
                                    <p><span>In Short</span>: : We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</p>
                                    <ul>
                                        <li><span>Consent</span>: We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</li>
                                        <li><span>Legitimate Interests</span>: We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                                        <li><span>Performance of a Contract</span>: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
                                        <li><span>Legal Obligations</span>: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).</li>
                                        <li><span>Vital Interests</span>: We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.
                                          More specifically, we may need to process your data or share your personal information in the following situations:</li>
                                          <li><span>Business Transfers</span>: We may share or transfer your information in connection with or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business to another company.</li>
                                          <li><span>Affiliates</span>: We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us.</li>
                                          <li><span>Business Partners</span>: We may share your information with our business partners to offer you certain products, services or promotions.</li>
                                    </ul>
                                </div>
                                </div>
                              </div>
                           </div>
                           <div className="card">
                              <div className="card-header" id="heading5">
                                <h2 className="mb-0">
                                  <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapse5" aria-expanded="false" aria-controls="collapseThree">
                                    5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
                                    <span className="fa-stack fa-2x">
                                      <i className="fas fa-plus fa-stack-1x fa-inverse"></i>
                                    </span>
                                  </button>
                                </h2>
                              </div>
                              <div id="collapse5" className="collapse" aria-labelledby="heading5" data-parent="#accordion">
                                <div className="card-body">                                  
                                 <div className="table__of__contents__text">
                                    <p><span>In Short</span>: : We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</p>
                                    <ul>
                                        <li><span>Consent</span>: We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</li>
                                        <li><span>Legitimate Interests</span>: We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                                        <li><span>Performance of a Contract</span>: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
                                        <li><span>Legal Obligations</span>: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).</li>
                                        <li><span>Vital Interests</span>: We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.
                                          More specifically, we may need to process your data or share your personal information in the following situations:</li>
                                          <li><span>Business Transfers</span>: We may share or transfer your information in connection with or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business to another company.</li>
                                          <li><span>Affiliates</span>: We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us.</li>
                                          <li><span>Business Partners</span>: We may share your information with our business partners to offer you certain products, services or promotions.</li>
                                    </ul>
                                </div>
                                </div>
                              </div>
                           </div>
                           <div className="card">
                              <div className="card-header" id="heading6">
                                <h2 className="mb-0">
                                  <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapse6" aria-expanded="false" aria-controls="collapseThree">
                                    6. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?
                                    <span className="fa-stack fa-2x">
                                      <i className="fas fa-plus fa-stack-1x fa-inverse"></i>
                                    </span>
                                  </button>
                                </h2>
                              </div>
                              <div id="collapse6" className="collapse" aria-labelledby="heading6" data-parent="#accordion">
                                <div className="card-body">
                                 <div className="table__of__contents__text">
                                    <p><span>In Short</span>: : We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</p>
                                    <ul>
                                        <li><span>Consent</span>: We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</li>
                                        <li><span>Legitimate Interests</span>: We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                                        <li><span>Performance of a Contract</span>: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
                                        <li><span>Legal Obligations</span>: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).</li>
                                        <li><span>Vital Interests</span>: We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.
                                          More specifically, we may need to process your data or share your personal information in the following situations:</li>
                                          <li><span>Business Transfers</span>: We may share or transfer your information in connection with or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business to another company.</li>
                                          <li><span>Affiliates</span>: We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us.</li>
                                          <li><span>Business Partners</span>: We may share your information with our business partners to offer you certain products, services or promotions.</li>
                                    </ul>
                                </div>
                                </div>
                              </div>
                           </div>
                           <div className="card">
                              <div className="card-header" id="heading7">
                                <h2 className="mb-0">
                                  <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapse7" aria-expanded="false" aria-controls="collapse7">
                                    7. HOW LONG DO WE KEEP YOUR INFORMATION?
                                    <span className="fa-stack fa-2x">
                                      <i className="fas fa-plus fa-stack-1x fa-inverse"></i>
                                    </span>
                                  </button>
                                </h2>
                              </div>
                              <div id="collapse7" className="collapse" aria-labelledby="heading7" data-parent="#accordion">
                                <div className="card-body">
                                 <div className="table__of__contents__text">
                                    <p><span>In Short</span>: : We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</p>
                                    <ul>
                                        <li><span>Consent</span>: We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</li>
                                        <li><span>Legitimate Interests</span>: We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                                        <li><span>Performance of a Contract</span>: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
                                        <li><span>Legal Obligations</span>: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).</li>
                                        <li><span>Vital Interests</span>: We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.
                                          More specifically, we may need to process your data or share your personal information in the following situations:</li>
                                          <li><span>Business Transfers</span>: We may share or transfer your information in connection with or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business to another company.</li>
                                          <li><span>Affiliates</span>: We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us.</li>
                                          <li><span>Business Partners</span>: We may share your information with our business partners to offer you certain products, services or promotions.</li>
                                    </ul>
                                </div>
                                </div>
                              </div>
                           </div>
                           <div className="card">
                              <div className="card-header" id="heading8">
                                <h2 className="mb-0">
                                  <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapse8" aria-expanded="false" aria-controls="collapse8">
                                    8. HOW DO WE KEEP YOUR INFORMATION SAFE?
                                    <span className="fa-stack fa-2x">
                                      <i className="fas fa-plus fa-stack-1x fa-inverse"></i>
                                    </span>
                                  </button>
                                </h2>
                              </div>
                              <div id="collapse8" className="collapse" aria-labelledby="heading8" data-parent="#accordion">
                                <div className="card-body">
                                 <div className="table__of__contents__text">
                                    <p><span>In Short</span>: : We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</p>
                                    <ul>
                                        <li><span>Consent</span>: We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</li>
                                        <li><span>Legitimate Interests</span>: We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                                        <li><span>Performance of a Contract</span>: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
                                        <li><span>Legal Obligations</span>: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).</li>
                                        <li><span>Vital Interests</span>: We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.
                                          More specifically, we may need to process your data or share your personal information in the following situations:</li>
                                          <li><span>Business Transfers</span>: We may share or transfer your information in connection with or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business to another company.</li>
                                          <li><span>Affiliates</span>: We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us.</li>
                                          <li><span>Business Partners</span>: We may share your information with our business partners to offer you certain products, services or promotions.</li>
                                    </ul>
                                </div>
                                </div>
                              </div>
                           </div>
                           <div className="card">
                              <div className="card-header" id="heading9">
                                <h2 className="mb-0">
                                  <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapse9" aria-expanded="false" aria-controls="collapse9">
                                    9. WHAT ARE YOUR PRIVACY RIGHTS?
                                    <span className="fa-stack fa-2x">
                                      <i className="fas fa-plus fa-stack-1x fa-inverse"></i>
                                    </span>
                                  </button>
                                </h2>
                              </div>
                              <div id="collapse9" className="collapse" aria-labelledby="heading9" data-parent="#accordion">
                                <div className="card-body">
                                 <div className="table__of__contents__text">
                                    <p><span>In Short</span>: : We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</p>
                                    <ul>
                                        <li><span>Consent</span>: We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</li>
                                        <li><span>Legitimate Interests</span>: We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                                        <li><span>Performance of a Contract</span>: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
                                        <li><span>Legal Obligations</span>: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).</li>
                                        <li><span>Vital Interests</span>: We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.
                                          More specifically, we may need to process your data or share your personal information in the following situations:</li>
                                          <li><span>Business Transfers</span>: We may share or transfer your information in connection with or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business to another company.</li>
                                          <li><span>Affiliates</span>: We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us.</li>
                                          <li><span>Business Partners</span>: We may share your information with our business partners to offer you certain products, services or promotions.</li>
                                    </ul>
                                </div>
                                </div>
                              </div>
                           </div>
                           <div className="card">
                              <div className="card-header" id="heading10">
                                <h2 className="mb-0">
                                  <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapse10" aria-expanded="false" aria-controls="collapse10">
                                    10. CONTROLS FOR DO-NOT-TRACK FEATURES
                                    <span className="fa-stack fa-2x">
                                      <i className="fas fa-plus fa-stack-1x fa-inverse"></i>
                                    </span>
                                  </button>
                                </h2>
                              </div>
                              <div id="collapse10" className="collapse" aria-labelledby="heading10" data-parent="#accordion">
                                <div className="card-body">
                                 <div className="table__of__contents__text">
                                    <p><span>In Short</span>: : We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</p>
                                    <ul>
                                        <li><span>Consent</span>: We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</li>
                                        <li><span>Legitimate Interests</span>: We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                                        <li><span>Performance of a Contract</span>: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
                                        <li><span>Legal Obligations</span>: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).</li>
                                        <li><span>Vital Interests</span>: We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.
                                          More specifically, we may need to process your data or share your personal information in the following situations:</li>
                                          <li><span>Business Transfers</span>: We may share or transfer your information in connection with or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business to another company.</li>
                                          <li><span>Affiliates</span>: We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us.</li>
                                          <li><span>Business Partners</span>: We may share your information with our business partners to offer you certain products, services or promotions.</li>
                                    </ul>
                                </div>
                                </div>
                              </div>
                           </div>
                           <div className="card">
                              <div className="card-header" id="heading11">
                                <h2 className="mb-0">
                                  <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapse11" aria-expanded="false" aria-controls="collapse11">
                                    11. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                                    <span className="fa-stack fa-2x">
                                      <i className="fas fa-plus fa-stack-1x fa-inverse"></i>
                                    </span>
                                  </button>
                                </h2>
                              </div>
                              <div id="collapse11" className="collapse" aria-labelledby="heading11" data-parent="#accordion">
                                <div className="card-body">
                                 <div className="table__of__contents__text">
                                    <p><span>In Short</span>: : We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</p>
                                    <ul>
                                        <li><span>Consent</span>: We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</li>
                                        <li><span>Legitimate Interests</span>: We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                                        <li><span>Performance of a Contract</span>: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
                                        <li><span>Legal Obligations</span>: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).</li>
                                        <li><span>Vital Interests</span>: We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.
                                          More specifically, we may need to process your data or share your personal information in the following situations:</li>
                                          <li><span>Business Transfers</span>: We may share or transfer your information in connection with or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business to another company.</li>
                                          <li><span>Affiliates</span>: We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us.</li>
                                          <li><span>Business Partners</span>: We may share your information with our business partners to offer you certain products, services or promotions.</li>
                                    </ul>
                                </div>
                                </div>
                              </div>
                           </div>
                           <div className="card">
                              <div className="card-header" id="heading12">
                                <h2 className="mb-0">
                                  <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapse12" aria-expanded="false" aria-controls="collapse12">
                                    12. DO WE MAKE UPDATES TO THIS POLICY?
                                    <span className="fa-stack fa-2x">
                                      <i className="fas fa-plus fa-stack-1x fa-inverse"></i>
                                    </span>
                                  </button>
                                </h2>
                              </div>
                              <div id="collapse12" className="collapse" aria-labelledby="heading12" data-parent="#accordion">
                                <div className="card-body">
                                 <div className="table__of__contents__text">
                                    <p><span>In Short</span>: : We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</p>
                                    <ul>
                                        <li><span>Consent</span>: We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</li>
                                        <li><span>Legitimate Interests</span>: We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                                        <li><span>Performance of a Contract</span>: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
                                        <li><span>Legal Obligations</span>: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).</li>
                                        <li><span>Vital Interests</span>: We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.
                                          More specifically, we may need to process your data or share your personal information in the following situations:</li>
                                          <li><span>Business Transfers</span>: We may share or transfer your information in connection with or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business to another company.</li>
                                          <li><span>Affiliates</span>: We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us.</li>
                                          <li><span>Business Partners</span>: We may share your information with our business partners to offer you certain products, services or promotions.</li>
                                    </ul>
                                </div>
                                </div>
                              </div>
                           </div>
                           <div className="card">
                              <div className="card-header" id="heading13">
                                <h2 className="mb-0">
                                  <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapse13" aria-expanded="false" aria-controls="collapse13">
                                    13. HOW CAN YOU CONTACT US ABOUT THIS POLICY?
                                    <span className="fa-stack fa-2x">
                                      <i className="fas fa-plus fa-stack-1x fa-inverse"></i>
                                    </span>
                                  </button>
                                </h2>
                              </div>
                              <div id="collapse13" className="collapse" aria-labelledby="heading13" data-parent="#accordion">
                                <div className="card-body">
                                 <div className="table__of__contents__text">
                                    <p><span>In Short</span>: : We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</p>
                                    <ul>
                                        <li><span>Consent</span>: We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</li>
                                        <li><span>Legitimate Interests</span>: We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                                        <li><span>Performance of a Contract</span>: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
                                        <li><span>Legal Obligations</span>: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).</li>
                                        <li><span>Vital Interests</span>: We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.
                                          More specifically, we may need to process your data or share your personal information in the following situations:</li>
                                          <li><span>Business Transfers</span>: We may share or transfer your information in connection with or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business to another company.</li>
                                          <li><span>Affiliates</span>: We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us.</li>
                                          <li><span>Business Partners</span>: We may share your information with our business partners to offer you certain products, services or promotions.</li>
                                    </ul>
                                </div>
                                </div>
                              </div>
                           </div>
                           <div className="card">
                              <div className="card-header" id="heading14">
                                <h2 className="mb-0">
                                  <button className="d-flex align-items-center justify-content-between btn btn-link collapsed" data-toggle="collapse" data-target="#collapse14" aria-expanded="false" aria-controls="collapse14">
                                    14. HOW CAN YOU REVIEW, UPDATE OR DELETE THE DATA WE COLLECT FROM YOU?
                                    <span className="fa-stack fa-2x">
                                      <i className="fas fa-plus fa-stack-1x fa-inverse"></i>
                                    </span>
                                  </button>
                                </h2>
                              </div>
                              <div id="collapse14" className="collapse" aria-labelledby="heading14" data-parent="#accordion">
                                <div className="card-body">
                                 <div className="table__of__contents__text">
                                    <p><span>In Short</span>: : We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</p>
                                    <ul>
                                        <li><span>Consent</span>: We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis:</li>
                                        <li><span>Legitimate Interests</span>: We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                                        <li><span>Performance of a Contract</span>: Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
                                        <li><span>Legal Obligations</span>: We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).</li>
                                        <li><span>Vital Interests</span>: We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.
                                          More specifically, we may need to process your data or share your personal information in the following situations:</li>
                                          <li><span>Business Transfers</span>: We may share or transfer your information in connection with or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business to another company.</li>
                                          <li><span>Affiliates</span>: We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us.</li>
                                          <li><span>Business Partners</span>: We may share your information with our business partners to offer you certain products, services or promotions.</li>
                                    </ul>
                                </div>
                                </div>
                              </div>
                           </div>



                        </div> */}
            <h5 style={{ cursor: 'pointer', color: '#3750FF' }}><b>1. WHAT INFORMATION DO WE COLLECT?</b></h5>
            <h5 style={{ cursor: 'pointer', color: '#3750FF' }}><b>2. HOW DO WE USE YOUR INFORMATION?</b></h5>
            <h5 style={{ cursor: 'pointer', color: '#3750FF' }}><b>3. WILL YOUR INFORMATION BE SHARED WITH ANYONE? </b></h5>
            <h5 style={{ cursor: 'pointer', color: '#3750FF' }}><b>4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES? </b></h5>
            <h5 style={{ cursor: 'pointer', color: '#3750FF' }}><b>5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?  </b></h5>
            <h5 style={{ cursor: 'pointer', color: '#3750FF' }}><b>6. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES? </b></h5>
            <h5 style={{ cursor: 'pointer', color: '#3750FF' }}><b>7. HOW LONG DO WE KEEP YOUR INFORMATION? </b></h5>
            <h5 style={{ cursor: 'pointer', color: '#3750FF' }}><b>8. HOW DO WE KEEP YOUR INFORMATION SAFE? </b></h5>
            <h5 style={{ cursor: 'pointer', color: '#3750FF' }}><b>9. WHAT ARE YOUR PRIVACY RIGHTS? </b></h5>
            <h5 style={{ cursor: 'pointer', color: '#3750FF' }}><b>10. CONTROLS FOR DO-NOT-TRACK FEATURES  </b></h5>
            <h5 style={{ cursor: 'pointer', color: '#3750FF' }}><b>11. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS? </b></h5>
            <h5 style={{ cursor: 'pointer', color: '#3750FF' }}><b>12. DO WE MAKE UPDATES TO THIS POLICY? </b></h5>
            <h5 style={{ cursor: 'pointer', color: '#3750FF' }}><b>13. HOW CAN YOU CONTACT US ABOUT THIS POLICY? </b></h5>
            <h5 style={{ cursor: 'pointer', color: '#3750FF' }}><b>14. HOW CAN YOU REVIEW, UPDATE OR DELETE THE DATA WE COLLECT FROM YOU?</b></h5>
            <br></br>

            <p><b>1. WHAT INFORMATION DO WE COLLECT?</b></p><br></br>
            <p><i><b>Personal information you disclose to us </b></i></p><br></br>
            <p><i><b>In Short:</b> We collect personal information that you provide to us.</i> </p><br></br>
            <p>We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services. When you participate in activities on our Services (such as by posting messages in our online forums or entering competitions, contests or giveaways) or otherwise when you contact us. </p><br></br>
            <p>The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make and the products and features you use. The personal information we collect may include the following: </p><br></br>
            <p><b>Personal Information Provided by You.</b> We collect names; phone numbers; email addresses; location; contact list; camera; photo; and other similar information. </p><br></br>
            <p><b>Social Media Login Data.</b> We may provide you with the option to register with us using your existing social media account details, like your Facebook, Twitter or other social media account. If you choose to register in this way, we will collect the Information described in the section called <b>"HOW DO WE HANDLE YOUR SOCIAL LOGINS" below. </b></p><br></br>
            <p>All personal information that you provide to us must be true, complete and accurate and you must notify us of any changes to such personal information.</p><br></br>

            <p><i><b>Information automatically collected </b></i></p><br></br>
            <p><i><b>In Short:</b>Some information-such as your Internet Protocol (IP) address and/or browser and device characteristics- is collected automatically when you visit our Services.</i> </p><br></br>
            <p>We automatically collect certain information when you visit, use or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes. </p><br></br>
            <p>Like many businesses, we also collect information through cookies and similar technologies. </p><br></br>
            <p>The information we collect includes: </p><br></br>

            <li><i><b>Log and Usage Data.</b></i> Log and usage data is service-related, diagnostic, usage and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches and other actions you take such as which features you use), device event information (such as system activity. error reports (sometimes called 'crash dumps') and hardware settings).</li><br></br>
            <li><i><b>Device Data.</b></i> We collect device data such as information about your computer, phone, tablet or other device you use to access the Services. Depending on the device used this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model Internet service provider and/or mobile carrier, operating system and system configuration information. </li><br></br>
            <li><i><b>Location Data.</b></i> We collect location data such as information about your devices location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. Note however, if you choose to opt out, you may not be able to use certain aspects of the Services. </li><br></br>

            <p><i><b> Information collected through our App </b></i></p><br></br>
            <p><i><b>In Short:</b> We collect information regarding your geo-location, mobile device, push notifications, when you use our App. If you use our App, we also collect the following information: </i> </p><br></br>


            <li><i><b>Geo-Location Information.  </b></i> We may request access or permission to and track location-based information from your mobile device, either continuously or while you are using our App, to provide certain location-based services. If you wish to change our access or permissions, you may do so in your device's settings.</li><br></br>
            <li><i><b>Mobile Device Access. </b></i>We may request access or permission to certain features from your mobile device, including your mobile devices contacts, camera, social media accounts, storage, and other features. If you wish to change our access or permissions, you may do so in your devices settings.  </li><br></br>
            <li><i><b>Mobile Device Data. </b></i> We automatically collect device information (such as your mobile device ID, model and manufacturer), operating system, version information and system configuration information, device and application identification numbers, browser type and version, hardware model Internet service provider and/or mobile carrier, and Internet Protocol (IP) address (or proxy server). If you are using our App, we may also collect information about the phone network associated with your mobile device, your mobile device's operating system or platform, the type of mobile device you use, your mobile device's unique device ID and information about the features of our App you accessed. </li><br></br>
            <li><i><b>Push Notifications. </b></i>We may request to send you push notifications regarding your account or certain features of the App. If you wish to opt-out from receiving these types of communications, you may turn them off in your devices settings.  </li><br></br>

            <p>This information is primarily needed to maintain the security and operation of our App, for troubleshooting and for our internal analytics and reporting purposes. </p><br></br>

            <p><b>2. HOW DO WE USE YOUR INFORMATION?</b></p><br></br>
            <p><i><b>In Short:</b> We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.</i> </p><br></br>

            <p>We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We indicate the specific processing grounds we rely on next to each purpose listed below. </p><br></br>
            <p>We use the information we collect or receive: </p><br></br>

            <li><b>To facilitate account creation and logon process. </b>If you choose to link your account with us to a third-party account (such as your Google or Facebook account), we use the information you allowed us to collect from those third parties to facilitate account creation and logon process for the performance of the contract. See the section below headed <b>"HOW DO WE HANDLE YOUR SOCIAL LOGINS"</b> for further information. </li><br></br>
            <li><b>To post testimonials.</b>We post testimonials on our Services that may contain personal information. Prior to posting a testimonial, we will obtain your consent to use your name and the content of the testimonial. If you wish to update or delete your testimonial, please contact us at support@fnmotivation.com and be sure to include your name, testimonial location, and contact information. </li><br></br>
            <li><b>Request feedback.</b>We may use your information to request feedback and to contact you about your use of our Services. </li><br></br>
            <li><b>To enable user-to-user communications.</b>We may use your information in order to enable user-to-user communications with each user's consent.</li><br></br>
            <li><b>To manage user accounts. </b>We may use your information for the purposes of managing our account and keeping it in working order. </li><br></br>
            <li><b>To send administrative information to you. </b>We may use your personal information to send you product, service and new feature information and/or information about changes to our terms, conditions and policies. </li><br></br>
            <li><b>To protect our Services. </b>We may use your information as part of our efforts to keep our Services safe and secure (for example: for fraud monitoring and prevention). </li><br></br>
            <li><b>To enforce our terms, conditions and policies for business purposes, to comply with legal and regulatory requirements or in connection with our contract. </b></li><br></br>
            <li><b>To respond to legal requests and prevent harm. </b>If we receive a subpoena or other legal request, we may need to inspect the data we hold to determine how to respond. </li><br></br>
            <li><b>For other business purposes.</b>We may use your information for other business purposes such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Services, products, marketing and your experience. We may use and store this information in aggregated form so that it is not associated with individual end users and does not include personal information. We will not use identifiable personal information without your consent. </li><br></br>



            <p><b>3. WILL YOUR INFORMATION BE SHARED WITH ANYONE? </b></p><br></br>

            <p><i><b>In Short:</b> We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. </i> </p><br></br>
            <p>We may process or share your data that we hold based on the following legal basis: </p><br></br>

            <li><i><b>Consent: </b></i>We may process your data if you have given us specific consent to use your personal information for a specific purpose. </li><br></br>
            <li><i><b>Legitimate Interests: </b></i>We may process your data when it is reasonably necessary to achieve our legitimate business interests. </li><br></br>
            <li><i><b>Performance of a Contract:</b></i>Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract. </li><br></br>
            <li><i><b>Legal Obligations: </b></i>We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements). </li><br></br>
            <li><i><b>Vital Interests: </b></i>We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved. </li><br></br>

            <p>More specifically, we may need to process your data or share your personal information in the following situations:</p><br></br>

            <li><i><b>Business Transfers. </b></i>We may share or transfer your information in connection with or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business to another company. </li><br></br>
            <li><i><b>Affiliates. </b></i>We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy policy. Affiliates include our parent company and any subsidiaries, joint venture partners or other companies that we control or that are under common control with us. </li><br></br>
            <li><i><b>Business Partners. </b></i>We may share your information with our business partners to offer you certain products, services or promotions. </li><br></br>


            <p><b>4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES? </b></p><br></br>
            <p><i><b>In Short:</b> </i>We may use cookies and other tracking technologies to collect and store your information. </p><br></br>


            <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice. </p><br></br>

            <p><b>5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?  </b></p><br></br>
            <p><i><b>In Short:</b>if you choose to register or log in to our services using a social media account, we may have access to certain information about you. </i> </p><br></br>

            <p>Our Services offers you the ability to register and login using your third-party social media account details (like your Facebook or Twitter logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile Information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, profile picture as well as other information you choose to make public on such social media platform. </p><br></br>
            <p>We will use the information we receive only for the purposes that are described in this privacy policy or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy policy to understand how they collect, use and share your personal information, and how you can set your privacy preferences on their sites and apps </p><br></br>


            <p><b>6. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES? </b></p><br></br>

            <p><i><b>In Short:</b>We are not responsible for the safety of any information that you share with third-party providers who advertise, but are not affiliated with our Website and our App.  </i> </p><br></br>
            <p><p>We will use the information we receive only for the purposes that are described in this privacy policy or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy policy to understand how they collect, use and share your personal information, and how you can set your privacy preferences on their sites and apps </p></p><br></br>

            <p><b>7. HOW LONG DO WE KEEP YOUR INFORMATION? </b></p><br></br>

            <p><i><b>In Short:</b> We keep your information for as long as necessary to fulfill the purposes outlined in this privacy policy unless otherwise required by law. </i> </p><br></br>
            <p><p> We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements). No purpose in this policy will require us keeping your personal information for longer than the period of time in which users have an account with us. </p></p><br></br>
            <p><p> When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible. </p></p><br></br>


            <p><b>8. HOW DO WE KEEP YOUR INFORMATION SAFE? </b></p><br></br>

            <p><i><b>In Short:</b>We aim to protect your personal information through a system of organizational and technical security measures. </i> </p><br></br>
            <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security, and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment. </p><br></br>


            <p><b>9. WHAT ARE YOUR PRIVACY RIGHTS? </b></p><br></br>
            <p><i><b>In Short:</b> </i> In some regions, such as the European Economic Area, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time. </p><br></br>

            <p>In some regions (like the European Economic Area), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information; (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information. To make such a request, please use the contact details provided below. We will consider and act upon any request in accordance with applicable data protection laws. </p><br></br>
            <p>If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time. Please note however that this will not affect the lawfulness of the processing before its withdrawal, nor will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</p><br></br>
            <p>If you are a resident in the European Economic Area and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here: <a  target="_blank" rel="noopener noreferrer"  href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index/en.html">https://ec.europa.eu/justice/data-protection/bodies/authorities/index/en.html</a></p><br></br>
            <p>If you are a resident in Switzerland, the contact details for the data protection authorities are available here: <a  target="_blank" rel="noopener noreferrer"  href="https://www.edoeb.admin.ch/edoeb/en/home.html">https://www.edoeb.admin.ch/edoeb/en/home.html</a></p><br></br>
            <p>If you have questions or comments about your privacy rights, you may email us at <b>support@fnmotivation.com.</b></p><br></br>

            <p><b> Account Information </b></p><br></br>
            <p>If you would at any time like to review or change the information in your account or terminate your account, you can: </p><br></br>

            <p><i>Log in to your account settings and update your user account.</i></p><br></br>
            <p>Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and for comply with applicable legal requirements. </p><br></br>

            <p><u><b>Cookies and similar technologies: </b></u>Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services. </p><br></br>
            <p><u><b>Opting out of email marketing: </b></u>You can unsubscribe from our marketing email list at any time by clocking on the unsubscribe fink in the email that we send or by contacting us using the details provided below. You will then be removed from the marketing email list, however we may still communicate with you, for example to send you service related emails that are necessary for the administration and use of your account to respond to service requests, or for other non-marketing purposes. To otherwise opt-out, you may: </p><br></br>
            <li>Access your account settings and update your preferences. </li><br></br>

            <p><b>10. CONTROLS FOR DO-NOT-TRACK FEATURES  </b></p><br></br>
            <p>Most web browsers and some mobile operating systems and mobile app captions include a Do-Not-Track ('DNT) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy policy. </p><br></br>

            <p><b>11. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS? </b></p><br></br>

            <p><i><b>In Short:</b>Yes if you are a resident of California, you are granted specific rights regarding access to your personal information.  </i> </p><br></br>

            <p>California Civil Code Section 1798.83, also known as the ‘’Shine The Light’’ law permits our users who are California residents to request and obtain from us, once a year and free of charge. information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which, we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below. </p><br></br>
            <p>n provided below. If you are under 18 years of age, reside in California, and have a registered account with a Service, you have the right to request removal of unwanted data that you publicly post on the Services. To request removal of such data, please contact us using the contact information provided below, and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Services, but please be aware that the data may not be completely or comprehensively removed from all our systems (e.g. backups. etc.).</p><br></br>

            <p><b>CCPA Privacy Policy</b></p><br></br>
            <p>The California Code of Regulations defines a 'resident' as: </p><br></br>
            <p>(1) Every individual who is in the State of California for other than a temporary or transitory purpose, and </p><br></br>
            <p>(2) Every individual who is domiciled in the State of California who is outside the State of California for a temporary or transitory purpose.</p><br></br>
            <p>All other individuals are defined as “non-residents”.</p><br></br>
            <p>If this definition of “resident" applies to you, we must adhere to certain rights and obligations regarding your personal information. </p><br></br>

            <p><b>What categories of personal information do we collect? </b></p><br></br>
            <p>We have collected the following categories of personal information in the past twelve (12) months: </p><br></br>

            <PrivacyTable />

            <p>We may also collect other personal information outside of these categories instances where you interact with us in-person, online or by phone or mail in the context of: </p><br></br>
            <li>Receiving help through our customer support channels; </li><br></br>
            <li>Participation in customer surveys or contests; and </li><br></br>
            <li>Facilitation in the delivery of our Services and to respond to your inquiries.</li><br></br>

            <p><b>How do we use and share your personal information? </b></p><br></br>
            <p><b>12. DO WE MAKE UPDATES TO THIS POLICY? </b></p><br></br>

            <p>More information about our data collection and sharing practices can be found in this privacy policy. You may contact us by email at support@fnmotivation.com, or by referring to the contact details at the bottom of this document</p><br></br>
            <p>If you are using an authorized agent to exercise your right to opt-out we may deny a request if the authorized agent does not submit proof that they have been validly authorized to act on your behalf. </p><br></br>

            <p>Will your information be shared with anyone else? <b></b></p><br></br>
            <p>We may disclose your personal information with our service providers pursuant to a written contract between us and each service provider. Each service provider is a for-profit entity that processes the information on our behalf. </p><br></br>
            <p>We may use your personal information for our own business purposes, such as for undertaking internal research for technological development and demonstration. This is not considered to be “selling” of your personal data.</p><br></br>
            <p>FUTURE NOW MOTIVATION, LLC has not disclosed or sold any personal information to third parties for a business or commercial purpose in the preceding 12 months. FUTURE NOW MOTIVATION, LLC will not sell personal information in the future belonging to website visitors, users and other consumers. </p><br></br>

            <p><b>Your rights with respect to your personal data</b></p><br></br>


            <p><b><u>Right to request deletion of the data - Request to delete </u></b></p><br></br>
            <p>You can ask for the deletion of your personal information. If you ask us to delete your personal information, we will respect your request and delete your personal information, subject to certain exceptions provided by law, such as (but not linked to) the exercise by another consumer of his or her right to free speech, our compliance requirements resulting from a legal obligation or any processing that may be required to protect against illegal activities. </p><br></br>

            <p><b><u>Right to be informed - Request to know </u></b></p><br></br>

            <p>Depending on the circumstances, you have a right to know:</p><br></br>

            <li>whether we collect and use your personal information; </li><br></br>
            <li>the categories of personal information that we collect;</li><br></br>
            <li>the purposes for which the collected personal information is used; </li><br></br>
            <li>whether we sell your personal information to third parties; </li><br></br>
            <li>the categories of personal information that we sold or disclosed for a business purpose;</li><br></br>
            <li>the categories of third parties to whom the personal information was sold or disclosed for a business purpose; and </li><br></br>
            <li>the business or commercial purpose for collecting or selling personal information. </li><br></br>

            <p>In accordance with applicable law, we are not obligated to provide or delete consumer information that is de-identified in response to a consumer request or to re-identify individual data to verify a consumer request. </p><br></br>

            <p><b><u>Right to Non-Discrimination for the Exercise of a Consumer's Privacy Rights</u></b></p><br></br>
            
            <p>We will not discriminate against you if you exercise your privacy rights.</p><br></br>

            <p><b><u>Verification process</u></b></p><br></br>
            <p>Upon receiving your request, we will need to verify your identity to determine you are the same person about whom we have the information in our system. These verification efforts require us to ask you to provide information so that we can match it with information you have previously provided us. For instance, depending on the type of request you submit, we may ask you to provide certain information so that we can match the information you provide with the information we already have on file or we may contact you through a communication method (e.g. phone or email) that you have previously provided to us. We may also use other verification methods as the circumstances dictate. </p><br></br>
            <p>We will only use personal information provided in your request to verify your identity or authority to make the request. To the extent possible, we will avoid requesting additional information from you for the purposes of verification. It however, if we cannot verify your identity from the information already maintained by us, we may request that you provide additional information for the purposes of verifying your identity, and for security or fraud-prevention purposes. We will delete such additionally provided information as soon as we finish verifying you. </p><br></br>


            <p><b><u>Other privacy rights </u></b></p><br></br>
            <li>you may object to the processing of your personal data </li><br></br>
            <li>you may request correction of your personal data if it is incorrect or no longer relevant. or ask to restrict the processing of the data </li><br></br>
            <li>you can designate an authorized agent to make a request under the CCPA on your behalf. We may deny a request from an authorized agent that does not submit proof that they have been validly authorized to act on your behalf in accordance with the CCPA. </li><br></br>
            <li>you may request to opt-out from future selling of your personal information to third parties. Upon receiving a request to opt-out. we will act upon the request as soon as feasibly possible, but no later than 15 days from the date of the request submission. </li><br></br>

            <p>To exercise these rights, you can contact us by email at support@fnmotivation.com, or by referring to the contact details at the bottom of this document, if you have a complaint about how we handle your data, we would like to hear from you.</p><br></br>



            <p><i><b></b></i></p><br></br>
            <p><i><b>In Short:</b>Yes, we will update this policy as necessary to stay compliant with relevant laws.  </i> </p><br></br>

            <p>We may update this privacy policy from time to time. The updated version will be indicated by an updated 'Revised" date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy policy, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information. </p><br></br>

            <p><b>13. HOW CAN YOU CONTACT US ABOUT THIS POLICY? </b></p><br></br>
            <p>If you have questions or comments about this policy, you may email us at support@ fnmotivation.com or by post to: </p><br></br>
            <p>FUTURE NOW MOTIVATION, LLC </p><br></br>
            <p>Montclair, New Jersey- 07942, United States </p><br></br>

            <p><b>14. HOW CAN YOU REVIEW, UPDATE OR DELETE THE DATA WE COLLECT FROM YOU?</b></p><br></br>
            <p>Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information or delete it in some circumstances. To request to review, update, or delete your personal information, please visit: <a  target="_blank" rel="noopener noreferrer"  href="https://www.fnmotivation.com">https://www.fnmotivation.com</a> We will respond to your request within 30 days.</p><br></br>
        </div>
            </div>
        </div>
    );
};

export default Privacy;
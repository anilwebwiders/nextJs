<?php
class StripePayment {

	public function connectAccountLink(){
		//https://drinxnj.com/staging2/Api/connectAccountLink?user_id=1
		if (isset($_REQUEST["user_id"]) && !empty($_REQUEST["user_id"])) { 
			$user_id = $_REQUEST["user_id"];
							try {
								require_once('application/third_party/stripe-php-master/init.php');

								$stripe = new \Stripe\StripeClient(stripe_secret);

								$resp2 = $stripe->accounts->create(
									['country' => 'US',
								    'type' => 'express',
								    'capabilities' => [
								      'card_payments' => ['requested' => true],
								      'transfers' => ['requested' => true],
								    ]
								  ]
								);
								
								$account_id = $resp2->id;
								$output['account_id']= $account_id; 
								$resp = $stripe->accountLinks->create(
									[
										'account' => $account_id,
										'refresh_url' => site_url().'account-disconnected?r=unsuccess&account_id='.$account_id,
										'return_url' => site_url().'account-connected?r=success&account_id='.$account_id,
										'type' => 'account_onboarding',
									]
								);
								
								$this->common->UpdateData("users", array("id"=>$user_id), array("stripe_account_id"=>$account_id));
								$output['status'] = 1;
								$output['message'] = 'Success';
								$output['data'] = $resp;
								
								//print_r($resp);	
							} catch(Exception $e) {
								//print_r($e);
								$output['status'] = 0;
								$output['message'] = 'Something went wrong';
							}
		} else {
								$output['status'] = 0;
								$output['message'] = 'Check parameter';
		}
		echo json_encode($output);
	}	
	

	public function connectAccountReturn(){
		//$output['e'] = '1';
		$user_id = $_REQUEST["user_id"];
		$this->common->UpdateData("users", array("id"=>$user_id), array("is_connected"=>1));
		$output['status'] = 1;
		$output['message'] = 'Success';
		//$output['data'] = $_REQUEST;
		echo json_encode($output);
	}	
	

	public function create_setup_intent(){
	//https://drinxnj.com/Api/create_setup_intent
		
		require_once('application/third_party/stripe-php-master/init.php');
		$this->form_validation->set_rules('email','email','trim|required');
		$this->form_validation->set_rules('stripe_account_id','stripe_account_id','trim|required');

		if($this->form_validation->run()){
			$amount = 0;
			$email = $this->input->post('email');
			$stripe_account_id = $this->input->post('stripe_account_id');
			//echo stripe_secret;
			\Stripe\Stripe::setApiKey(stripe_secret);

			$stripe = new \Stripe\StripeClient(stripe_secret);
			
			/*$customer = \Stripe\Customer::create([
				'email' => $email,
			 ]);*/
			/*$setupIntent = \Stripe\SetupIntent::create(
				[
				'usage'=>'off_session',
				'payment_method_types'=>['card'],
				'customer' => $customer->id
				])
			 );*/
			 
			/*$source = $stripe->sources->create([
				"type" => "ach_credit_transfer",
				"currency" => currency,
				"owner" => [
					"email" => $email
				]
			]);


			$customer = $stripe->customers->create(
				['email' => $email, 'source' => $source->id]
			);

			$tokens = $stripe->tokens->create(
				['customer' => $customer->id],
				['stripe_account' => $stripe_account_id]
			);

			$tokens3 = $stripe->customers->create(
				['source' => $tokens->id],
				['stripe_account' => $stripe_account_id]
			);*/
			 
			$setupIntent = $stripe->setupIntents->create([
				//'amount' => $amount*100,
				//'currency' => currency,
				//'application_fee_amount'=>$comission*100,
				'payment_method_types' => ['card'],
				//'payment_method' => $payment_method,
				//'customer' => $tokens3->id,
				'usage' => 'off_session',
				//'confirm' => true,
			], ['stripe_account' => $stripe_account_id]);
			
			
			//print_r($setupIntent); die();
			$setupIntent['process_type']='setup';

			//$setupIntent['stripe_customer_id']=$tokens3->id;
			$output['data'] =$setupIntent;
			$output['status'] = 1;
			$output['message'] = 'Success!';

		}else {

			$output['status'] = 0;
			$output['message'] = 'Check parameter.';
		}
		echo json_encode($output);

	}

	public function SaveCard()
	{
		//https://drinxnj.com/Api/SaveCard
		if (isset($_REQUEST['user_id']) && !empty($_REQUEST['user_id'])
				&& isset($_REQUEST['email']) && !empty($_REQUEST['email'])
				&& isset($_REQUEST['customerID']) && !empty($_REQUEST['customerID'])
				&& isset($_REQUEST['payment_method']) && !empty($_REQUEST['payment_method'])) {
					
					$user_id = $_REQUEST['user_id'];
					$CardData = $this->get_single_saved_card($_REQUEST['payment_method']);
					print_r($CardData);
					if(isset($CardData->card->last4)){
						

					$insert['card_no'] = $CardData->card->last4;
          $insert['card_month'] = $CardData->card->exp_month;
          $insert['card_year'] =  $CardData->card->exp_year; 
					$insert["customerID"] = $_REQUEST['customerID'];
					$insert["payment_method"] = $_REQUEST['payment_method'];

          $userAlreadyCard = $this->common_model->GetSingleData('card_details', array('user_id'=>$user_id, 'card_no'=>$insert['card_no'], 'card_month'=>$insert['card_month'], 'card_year'=>$insert['card_year']));

          //$saved_card1 = $this->common_model->GetSingleData('card_details',array('user_id'=>$user_id));
           if ($userAlreadyCard == false) {              
          					$insert['user_id'] = $_REQUEST['user_id'];
										$insert["email"] = $_REQUEST['email'];			
										$insert["created_at"] = date('Y-m-d H:i:s');
										$run = $this->common_model->InsertData('card_details',$insert);
           } else if ($userAlreadyCard == true) {
										$run = $this->common_model->UpdateData('card_details', array('id'=>$userAlreadyCard['id']),$insert);           	 					
           }
					}


					if ($run) {
						$output['status'] = 1;
						$output['message'] = 'Success!!';
					} else {
						$output['status'] = 1;
						$output['message'] = 'Something went wrong!!';
					}

			} else {
			$output['status'] = 0;
			$output['message'] = 'Check parameter.';
		}
		echo json_encode($output);
			
	}
	
	public function get_saved_card(){
		//https://drinxnj.com/Api/get_saved_card
		
		if(isset($_REQUEST['user_id']) && !empty($_REQUEST['user_id'])){
			
			$user_id = $_REQUEST['user_id'];
			
			$saved_card1 = $this->common_model->GetAllData('card_details',array('user_id'=>$user_id),'id','desc');
			$result = array();
			if($saved_card1){
				foreach ($saved_card1 as $key => $saved_card) {					      
								
								$url = 'https://api.stripe.com/v1/payment_methods/'.$saved_card['payment_method'];
								
								$curl = curl_init();
								curl_setopt_array($curl, array(
									CURLOPT_URL => $url,
									CURLOPT_RETURNTRANSFER => true,
									CURLOPT_ENCODING => "",
									CURLOPT_MAXREDIRS => 10,
									CURLOPT_TIMEOUT => 0,
									CURLOPT_FOLLOWLOCATION => true,
									CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
									CURLOPT_CUSTOMREQUEST => "GET",
									CURLOPT_HTTPHEADER => array(
										"Authorization: Bearer " . stripe_secret
									),
								));
								$response = curl_exec($curl);
								curl_close($curl);
								$response = json_decode($response);
								
								$saved_card['card'] = $response;
								$result[$key] = $saved_card;
				}
								$output['data'] = $result;
								$output['status'] = 1;
								$output['message'] = 'Saved cards list!';
				
			} else {
				$output['status'] = 0;
				$output['message'] = 'We did not find any card.';
			}
		} else {
			$output['status'] = 0;
			$output['message'] = 'Check parameter.';
		}
		echo json_encode($output);
	}

	public function make_payment_from_saved_card(){
		//https://drinxnj.com/Api/make_payment_from_saved_card
		
		$this->form_validation->set_rules('user_id','user_id','trim|required');
		$this->form_validation->set_rules('amount','amount','trim|required');
		$this->form_validation->set_rules('customerID','customerID','trim|required');
		$this->form_validation->set_rules('payment_method','payment_method','trim|required');
		$this->form_validation->set_rules('stripe_account_id','stripe_account_id','trim|required');
		$this->form_validation->set_rules('email','email','trim|required');

		if($this->form_validation->run()){
			$check = true;
			//$error2 = $this->LANG['text-219'];

			$user_id = $this->input->post('user_id');
			$customerID = $this->input->post('customerID');
			$payment_method = $this->input->post('payment_method');
			$stripe_account_id = $this->input->post('stripe_account_id');
			$email = $this->input->post('email');
			$amount = $this->input->post('amount')*1;

      

			/*$customer = \Stripe\Customer::create([
				'payment_method' => $payment_method,
			]);
			
			$payment_method = \Stripe\PaymentMethod::retrieve($payment_method);
			$payment_method->attach(['customer' => $customer->id]);*/

			
			try {
							
				require_once('application/third_party/stripe-php-master/init.php');
			
				$stripe = new \Stripe\StripeClient(stripe_secret);
								
								
				/*$customer = $stripe->customers->create([
					'email' => $email,
					'source' => 'tok_mastercard',
					]);
					
				$token = $stripe->tokens->create([
				'customer' => $customer->id
				], [
				'stripe_account' => $stripe_account_id,
				]);
				
				$customer1 = $stripe->customers->create([
					'source' => $token->id,
					], [
					'stripe_account' => $stripe_account_id,
					]);
					
					
				$response = $stripe->paymentIntents->create([
					'amount' => $amount*100,
					'currency' => currency,
					'application_fee_amount'=>$comission*100,
					'payment_method_types' => ['card'],
					'payment_method' => $customer1->default_source,
					'customer' => $customer1->id,
					'off_session' => true,
					'confirm' => true,
					], ['stripe_account' => $stripe_account_id]);*/
					
				$response = $stripe->paymentIntents->create([
									'amount' => $amount*100,
									'currency' => currency,
									'application_fee_amount'=>$comission*100,
									'payment_method_types' => ['card'],
									'payment_method' => $payment_method,
									'customer' => $customerID,
									'off_session' => true,
									'confirm' => true,
						], ['stripe_account' => $stripe_account_id]);
		
			
				/*$response = \Stripe\PaymentIntent::create([
					'amount' => $amount*100,
					'currency' => currency,
					'customer' => $customerID,
					'description' => $statement_descriptor,
					'payment_method' => $payment_method,
					'off_session' => true,
					'confirm' => true,
				]);*/
				
			
				$chargeJson = $response->jsonSerialize();
				$output['chargeJson']  = $chargeJson;

				//if($chargeJson['status'] == 'succeeded'){
					$check = false;
					//$txnID = md5(rand(1000,999).time());
					
					$output['status'] = 1;
					$output['message'] = 'Success';
					//$output['txnID'] = $txnID;
				//}
			} catch(\Stripe\Exception\CardException $e) {
				
				$check = true;
				
				$error2 = $e->getError()->code;
				$error3 = $e;
				
				$payment_intent_id = $e->getError()->payment_intent->id;
				$payment_intent = \Stripe\PaymentIntent::retrieve($payment_intent_id);
				
				$output['message'] = $error2;
				$output['error3'] = $error3;
				$output['data'] = $payment_intent;
				
				$output['status'] = 2;
				
			} catch (\Stripe\Exception\RateLimitException $e) {
				
				$error2 = $e->getError()->code;
				$error3 = $e;
				
			} catch (\Stripe\Exception\InvalidRequestException $e) {
				
				$error2 = $e->getError()->code;
				$error3 = $e;
				
			} catch (\Stripe\Exception\AuthenticationException $e) {
				
				$error2 = $e->getError()->code;
				$error3 = $e;
				
			} catch (\Stripe\Exception\ApiConnectionException $e) {
				
				$error2 = $e->getError()->code;
				$error3 = $e;
				
			} catch (\Stripe\Exception\ApiErrorException $e) {
				
				$error2 = $e->getError()->code;
				$error3 = $e;
				
			} catch (Exception $e) {
				
				$error2 = $e->getError()->code;
				$error3 = $e;
				
			}
				
			if($check){
				$output['status'] = 0;
				$output['message'] = $error2;
				$output['error3'] = $error3;
			}
			
		} else {
			$output['status'] = 0;
			$output['message'] = 'Check parameter!!';
		}
		echo json_encode($output);
	}
	
	public function paymentWithPaymentMethod(){
		//https://drinxnj.com/Api/make_payment_from_saved_card
		
		
		$this->form_validation->set_rules('payment_method','payment_method','trim|required');
		$this->form_validation->set_rules('stripe_account_id','stripe_account_id','trim|required');
		$this->form_validation->set_rules('email','email','trim|required');
		$this->form_validation->set_rules('amount','amount','trim|required');

		if($this->form_validation->run()){
			$check = true;
			//$error2 = $this->LANG['text-219'];

			$payment_method = $this->input->post('payment_method');
			$stripe_account_id = $this->input->post('stripe_account_id');
			$email = $this->input->post('email');
			$amount = $this->input->post('amount')*1;


			try {
							
				require_once('application/third_party/stripe-php-master/init.php');
			
				$stripe = new \Stripe\StripeClient(stripe_secret);
								
								
				$customer = $stripe->customers->create([
					'email' => $email,
					//'source' => 'tok_mastercard',
					]);/*
					
				$token = $stripe->tokens->create([
				'customer' => $customer->id
				], [
				'stripe_account' => $stripe_account_id,
				]);
				
				$customer1 = $stripe->customers->create([
					'source' => $token->id,
					], [
					'stripe_account' => $stripe_account_id,
					]);
					
					
				$response = $stripe->paymentIntents->create([
					'amount' => $amount*100,
					'currency' => currency,
					'application_fee_amount'=>$comission*100,
					'payment_method_types' => ['card'],
					'payment_method' => $customer1->default_source,
					'customer' => $customer1->id,
					'off_session' => true,
					'confirm' => true,
					], ['stripe_account' => $stripe_account_id]);*/
					
				$response = $stripe->paymentIntents->create([
									'amount' => 100,
									'currency' => currency,
									'application_fee_amount'=>10,
									'payment_method_types' => ['card'],
									'payment_method' => $payment_method,
									'customer' => $customer->id,
									'off_session' => true,
									'confirm' => true,
						], ['stripe_account' => $stripe_account_id]);
		
			
				/*$response = \Stripe\PaymentIntent::create([
					'amount' => $amount*100,
					'currency' => currency,
					'customer' => $customerID,
					'description' => $statement_descriptor,
					'payment_method' => $payment_method,
					'off_session' => true,
					'confirm' => true,
				]);*/
				
			
				$chargeJson = $response->jsonSerialize();
				$output['chargeJson']  = $chargeJson;

				//if($chargeJson['status'] == 'succeeded'){
					$check = false;
					//$txnID = md5(rand(1000,999).time());
					
					$output['status'] = 1;
					$output['message'] = 'Success';
					//$output['txnID'] = $txnID;
				//}
			} catch(\Stripe\Exception\CardException $e) {
				
				$check = true;
				
				$error2 = $e->getError()->code;
				$error3 = $e;
				
				$payment_intent_id = $e->getError()->payment_intent->id;
				$payment_intent = \Stripe\PaymentIntent::retrieve($payment_intent_id);
				
				$output['message'] = $error2;
				$output['error3'] = $error3;
				$output['data'] = $payment_intent;
				
				$output['status'] = 2;
				
			} catch (\Stripe\Exception\RateLimitException $e) {
				
				$error2 = $e->getError()->code;
				$error3 = $e;
				
			} catch (\Stripe\Exception\InvalidRequestException $e) {
				
				$error2 = $e->getError()->code;
				$error3 = $e;
				
			} catch (\Stripe\Exception\AuthenticationException $e) {
				
				$error2 = $e->getError()->code;
				$error3 = $e;
				
			} catch (\Stripe\Exception\ApiConnectionException $e) {
				
				$error2 = $e->getError()->code;
				$error3 = $e;
				
			} catch (\Stripe\Exception\ApiErrorException $e) {
				
				$error2 = $e->getError()->code;
				$error3 = $e;
				
			} catch (Exception $e) {
				
				$error2 = $e->getError()->code;
				$error3 = $e;
				
			}
				
			if($check){
				$output['status'] = 0;
				$output['message'] = $error2;
				$output['error3'] = $error3;
			}
			
		} else {
			$output['status'] = 0;
			$output['message'] = 'Check parameter!!';
		}
		echo json_encode($output);
	}

	public function create_payment_intent(){
		//https://drinxnj.com/Api/create_payment_intent

		$error2 = false;

		$this->form_validation->set_rules('email','email','trim|required');
		$this->form_validation->set_rules('amount','amount','trim|required');		
		$this->form_validation->set_rules('stripe_account_id','stripe_account_id','trim|required');		

		if($this->form_validation->run()){
			
			$email = $this->input->post('email');
			$stripe_account_id = $this->input->post('stripe_account_id');
			$amount = $this->input->post('amount')*1;
		  $fee = $this->common_model->GetSingleData('admin', array('id'=>1));
			$comission = (1.3+$fee["admin_fee"]);
			require_once('application/third_party/stripe-php-master/init.php');
			
			$secret_key = stripe_secret;
			
			$statement_descriptor = 'Book order';
		
			\Stripe\Stripe::setApiKey($secret_key);
			try {											
			
				$stripe = new \Stripe\StripeClient($secret_key);
				
				$source = $stripe->sources->create([
					"type" => "ach_credit_transfer",
					"currency" => currency,
					"owner" => [
						"email" => $email
					]
				]);
			
				
				$customer = $stripe->customers->create(
					['email' => $email, 'source' => $source->id]
					
				);
				
				/*$source2 = $stripe->sources->create([
					'customer' => $customer->id,
					'original_source' => $source->id,
					'usage' => 'reusable',
				], [
					'stripe_account' => $stripe_account_id
				]);
				
				print_r($source2); die();*/
				
				
				$tokens = $stripe->tokens->create(
					['customer' => $customer->id],
					['stripe_account' => $stripe_account_id]
				);
				
				$tokens3 = $stripe->customers->create(
					['source' => $tokens->id],
					['stripe_account' => $stripe_account_id]
				);
				
				
				$paymentIntent = $stripe->paymentIntents->create([
					'amount' => $amount*100,
					'currency' => currency,
					'customer' => $tokens3->id,
					'description' => $statement_descriptor,
					'setup_future_usage' => 'off_session',
					'payment_method_types'=>['card'], 
					'application_fee_amount' => $comission*100,
					'payment_method_options' => [
						"card" => [
							"request_three_d_secure" => "any"
						]
					 ],
					 
				], ['stripe_account' => $stripe_account_id]);
				
		
				
				$output = array(
						'status' => 1,
						'customerID' => $tokens3->id,//no use this in future
						'clientSecret' => $paymentIntent->client_secret
					);
				
			} catch(\Stripe\Exception\CardException $e) {
	
				$error3 = $e;
				$error2 = $e->getError()->message;
				
			} catch (\Stripe\Exception\RateLimitException $e) {
				
				$error3 = $e;
				$error2 = $e->getError()->message;
				
			} catch (\Stripe\Exception\InvalidRequestException $e) {
				
				$error3 = $e;
				$error2 = $e->getError()->message;
				
			} catch (\Stripe\Exception\AuthenticationException $e) {
				
				$error3 = $e;
				$error2 = $e->getError()->message;
				
			} catch (\Stripe\Exception\ApiConnectionException $e) {
				
				$error3 = $e;
				$error2 = $e->getError()->message;
				
			} catch (\Stripe\Exception\ApiErrorException $e) {
				
				$error3 = $e;
				$error2 = $e->getError()->message;
				
			} catch (Exception $e) {
				
				$error3 = $e;
				$error2 = $e->getError()->message;
				
			}
			
			if($error2){
				$output = array(
				'status' => 0, 
				'message' => $error2
			);
			}
				
						
		} else {
			$output['status'] = 0;
			$output['message'] = 'Check parameter!!';
		}
		echo json_encode($output);
	}



 
	public function get_single_saved_card($payment_method){
    //https://www.bluediamondresearch.com/WEB01/drinx/Api/get_saved_card
      /*    
      $user_id = $this->session->userdata('user_id');
      
      $saved_card1 = $this->common_model->GetSingleData('card_details',array('user_id'=>$user_id),'id','desc');
      if ($payment_method != '') {
         $payment_method = $payment_method;
         $saved_card1 = true;
      } else if ($saved_card1) {
        $payment_method = $saved_card1['payment_method'];                
      }*/
      //echo $payment_method;
      //if($saved_card1) {
                
                $url = 'https://api.stripe.com/v1/payment_methods/'.$payment_method;
                //$url = 'https://api.stripe.com/v1/payment_methods/pm_1K7ef8LEGsv8VYZLxjXJM4dt';
                
                $curl = curl_init();
                curl_setopt_array($curl, array(
                  CURLOPT_URL => $url,
                  CURLOPT_RETURNTRANSFER => true,
                  CURLOPT_ENCODING => "",
                  CURLOPT_MAXREDIRS => 10,
                  CURLOPT_TIMEOUT => 0,
                  CURLOPT_FOLLOWLOCATION => true,
                  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                  CURLOPT_CUSTOMREQUEST => "GET",
                  CURLOPT_HTTPHEADER => array(
                    "Authorization: Bearer ".stripe_secret
                  ),
                ));
                $response = curl_exec($curl);
                curl_close($curl);
								//print_r($response);
                return $response = json_decode($response);
                return true;
        
      //} 
  }

 
} ?>
<?php
openlog("PHP:WebHook", LOG_PID | LOG_PERROR, LOG_LOCAL0);

// What command to execute upon retrieval of a valid push event.
$command = $_ENV['WEBHOOK_CMD'];

// The shared secret, used to sign the POST data (using HMAC with SHA1).
$secret = $_ENV['WEBHOOK_TOKEN'];

// Receive POST data for signature calculation.
$post_data = file_get_contents('php://input');
$signature = hash_hmac('sha1', $post_data, $secret);

// Required data in POST body.
$required_data = array(
  'ref' => $_ENV['WEBHOOK_REF'],
  'repository' => array(
    'full_name' => $_ENV['WEBHOOK_REPOSITORY_NAME'],
  ),
);

// Required data in headers.
$required_headers = array(
  'REQUEST_METHOD' => 'POST',
  'HTTP_X_GITHUB_EVENT' => 'push',
  'HTTP_USER_AGENT' => 'GitHub-Hookshot/*',
  'HTTP_X_HUB_SIGNATURE' => 'sha1=' . $signature,
);

// END OF CONFIGURATION

error_reporting(0);

function array_matches($actual, $expected, $name = 'array')
{
  $ret = true;
  if (is_array($actual)) {
    foreach ($expected as $key => $value) {
      if (!array_key_exists($key, $actual)) {
        syslog(LOG_INFO, "Missing: $key");
        $ret = false;
      } else if (is_array($value) && is_array($actual[$key])) {
        $ret &= array_matches($actual[$key], $value);
      } else if (is_array($value) || is_array($actual[$key])) {
        syslog(LOG_INFO, "Type mismatch: $key");
        $ret = false;
      } else if (!fnmatch($value, $actual[$key])) {
        syslog(LOG_INFO, "Value mismatch for '{$key}' expected: '{$value}' actual: {$actual[$key]}");
        $ret = false;
      }
    }
  } else {
    syslog(LOG_INFO, "Not an array: $name");
    $ret = false;
  }
  return $ret;
}

// Log information about the request.
syslog(LOG_INFO, "Received request from {$_SERVER['REMOTE_ADDR']}");

header("Content-Type: text/plain");
$data = json_decode($post_data, true);
// First do all checks and then report back in order to avoid timing attacks.
$headers_ok = array_matches($_SERVER, $required_headers, '$_SERVER');
$data_ok = array_matches($data, $required_data, '$data');
// We do not log pass this point.
closelog();
if ($headers_ok && $data_ok) {
  // Assume long running process here, so we do not wait for it to end.
  shell_exec($command);
  http_response_code(200);
} else {
  http_response_code(403);
  die("Forbidden\n");
}

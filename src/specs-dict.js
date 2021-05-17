module.exports = {
  f1: 'Authentication Management',
  s11: 'Should show an error message whether user and password are wrong',
  st111: 'When a user tries to login',
  st112: 'Then the application displays an error message "Please fill out the form to sign in."',
  
  s12: 'Should show an error message whether the user is empty',
  st121: 'When a user tries to login',
  st122: 'Then the application displays an error message "Please fill out the form to sign in.',

  s13: 'Should show an error message whether the password is empty',
  st131: 'When a user tries to login',
  st132: 'Then the application displays an error message "Please fill out the form to sign in."',

  s14: 'Should show an error message whether the user and password are empty',
  st141: 'When a user tries to login',
  st142: 'Then the application displays an error message "Please fill out the form to sign in."',


  s15: 'Should display an error message whether the user clicks on Forgot My Password btn, without email',
  st151: 'And the user tries to login without credentials',
  st152: 'When the user clicks con "Forgot" btn',
  st153: 'Then the app displays this message: "We need your email address to reset your password!"',

  s16: 'Should login with right user and password',
  st161: 'When a user tries to login',
  st162: 'Then the application redirects the user to /site page',

  s17: 'Should block the user to go to /site page if session is no longer active',
  st171: 'When the user logs out',
  st172: 'Then the current page should be /signin',
  st173: 'Then the app must be /signin as a redirection of the system',

  f2: 'Password Management :: Handle errors',

  s21: 'Should show an error in both, Old password and New password inputs, when those values are empty',
  st211: 'Given a logged in user',
  st212: 'And the user goes to My profile page',
  st213: 'And with empty old password and new password fields',
  st214: 'When the user tries to change the password',
  st215: 'Then the application displays an error message in both, new and old password fields',


  s22: 'Should show an error whether the new password and old password doesnt match',
  st221: 'Given a logged in user',
  st222: 'And the user goes to My profile page',
  st223: 'And with different new password than the verification one',
  st224: 'When the user tries to change the password',
  st225: 'Then the application displays an error message: Your new passwords do not match',

  f3: 'Post Management ',
  s31: 'Deberia publicar el post de manera correcta',
  st311: 'When a user try to create a post ',
  st312: 'Then the application display a message that the post was published.',
  st313 : 'Make logout',

  f4: 'Tags Management',
  s41: 'Should create a tag',
  st411 : 'When a user tries to create tag',
  st412 : 'Then the application displays a tags page',
};
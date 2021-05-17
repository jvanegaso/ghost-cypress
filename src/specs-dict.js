module.exports = {
  f1: 'Authentication Management',
  s11: 'Should show an error message whether user and password are wrong',
  st111: 'When a user tries to login',
  st112: 'Then the application displays an error message "Please fill out the form to sign in."',
  
  
  s16: 'Should login with right user and password',
  st161: 'When a user tries to login',
  st162: 'Then the application redirects the user to /site page',

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
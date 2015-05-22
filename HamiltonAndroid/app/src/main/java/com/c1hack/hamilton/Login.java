package com.c1hack.hamilton;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.parse.LogInCallback;
import com.parse.Parse;
import com.parse.ParseUser;


public class Login extends ActionBarActivity {
    String username, password;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        Parse.enableLocalDatastore(this);
        Parse.initialize(this, "PsV2YLyCT84lnQnU6kQgzzWItDohjhqAAZILjj5K", "0TlZ8BlfbKnYZffVkHRd4FAaIskujoYOk0ZRODnI");
        


        Button login = (Button) findViewById(R.id.loginButton);
        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.v("Login bruh", "loggggg");
                final Intent intent = new Intent(Login.this, MainActivity.class);
                username = ((EditText) findViewById(R.id.ID)).getText().toString();
                password = ((EditText) findViewById(R.id.PW)).getText().toString();
                Log.v("Login bruh", username);
                Log.v("Login bruh", password);



                ParseUser.logInInBackground(username, password, new LogInCallback() {
                    @Override
                    public void done(ParseUser parseUser, com.parse.ParseException e) {
                        Log.v("Login bruh", password);
                        if (parseUser != null) {
                            startActivity(intent);
                        }
                        else {
                            Toast.makeText(getApplicationContext(), "invalid user!", Toast.LENGTH_SHORT).show();
                        }

                    }
                });

            }
        });

        Button signup = (Button) findViewById(R.id.signupButton);
        signup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Login.this, Register.class);
                startActivity(intent);
            }
        });


    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_login, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}

package com.c1hack.hamilton;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.v4.app.FragmentStatePagerAdapter;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v7.app.ActionBarActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.parse.LogOutCallback;
import com.parse.ParseException;
import com.parse.ParseFile;
import com.parse.ParseObject;
import com.parse.ParseUser;
import com.parse.SaveCallback;

import java.io.ByteArrayOutputStream;


public class MainActivity extends ActionBarActivity {

    private static final int CAPTURE_IMAGE_ACTIVITY_REQUEST_CODE = 100;
    private Uri fileUri;
    private static final int NUM_PAGES = 3;
    private ViewPager pager;
    private PagerAdapter pagerAdapter;
    String username;
    AlertDialog.Builder builder;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        username = ParseUser.getCurrentUser().getUsername().toString();
        pager = (ViewPager) findViewById(R.id.pager);
        pagerAdapter = new ScreenSlidePagerAdapter(getSupportFragmentManager());
        pager.setAdapter(pagerAdapter);

        Button goToCam = (Button) findViewById(R.id.Cam);
        goToCam.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);

//                fileUri = getOutputMediaFileUri(MEDIA_TYPE_IMAGE); // create a file to save the image
                intent.putExtra(MediaStore.EXTRA_OUTPUT, fileUri);

                startActivityForResult(intent, 0);
            }
        });

        Button makeTrip = (Button) findViewById(R.id.trip);
        makeTrip.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, MakeTrip.class);
                startActivity(intent);
            }
        });

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == 0) {
            if (resultCode == RESULT_OK) {
                // Image captured and saved to fileUri specified in the Intent



                Bitmap photo = (Bitmap) data.getExtras().get("data");
                //Uri tempUri = getImageUri(getApplicationContext(), photo);
                //File finalFile = new File(getRealPathFromURI(tempUri));

                ByteArrayOutputStream stream = new ByteArrayOutputStream();
                photo.compress(Bitmap.CompressFormat.JPEG, 100, stream);
                byte[] byteArray = stream.toByteArray();

                final ParseFile file = new ParseFile("receipt.jpg",byteArray);
                file.saveInBackground(new SaveCallback() {
                    @Override
                    public void done(ParseException e) {
                        if(e == null){
                            ParseObject transaction = new ParseObject("Transaction");
                            transaction.put("image", file);
                            transaction.put("processed", false);
                            transaction.put("author", username);
                            transaction.saveInBackground(new SaveCallback() {
                                @Override
                                public void done(ParseException e) {
                                    if (e == null) {
//                                        HttpClient httpclient = new DefaultHttpClient();
//                                        HttpPost httppost = new HttpPost("127.0.0.1:5000");

//                                        try {
//                                            // Add your data
//                                            ByteArrayOutputStream bos = new ByteArrayOutputStream();
//                                            List<NameValuePair> nameValuePairs = new ArrayList<NameValuePair>(2);
//                                            nameValuePairs.add(new BasicNameValuePair("image", file.toString()));
//                                            nameValuePairs.add(new BasicNameValuePair("processed", "false"));
//                                            nameValuePairs.add(new BasicNameValuePair("author", username));
//                                            httppost.setEntity(new UrlEncodedFormEntity(nameValuePairs));
//
//                                            // Execute HTTP Post Request
//                                            HttpResponse response = httpclient.execute(httppost);
//
//                                        } catch (ClientProtocolException e) {
                                            // TODO Auto-generated catch block
//                                        } catch (IOException er) {
//                                            // TODO Auto-generated catch block
//                                        }
                                    } else {
                                        Log.e("ParseObject", "object did not form");
                                    }
                                }
                            });

                            Toast.makeText(MainActivity.this, "Image sent!", Toast.LENGTH_LONG).show();
                            Intent intent = new Intent(MainActivity.this, ResponseWait.class);
                            startActivity(intent);
                        }
                        else{
                            Log.e("image error", e.getMessage());
                        }
                    }
                });



            } else if (resultCode == RESULT_CANCELED) {
                // User cancelled the image capture
            } else {
                // Image capture failed, advise user
            }
        }
    }

    public Uri getImageUri(Context inContext, Bitmap inImage) {
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        inImage.compress(Bitmap.CompressFormat.JPEG, 100, bytes);
        String path = MediaStore.Images.Media.insertImage(inContext.getContentResolver(), inImage, "Title", null);
        return Uri.parse(path);
    }

    public String getRealPathFromURI(Uri uri) {
        Cursor cursor = getContentResolver().query(uri, null, null, null, null);
        cursor.moveToFirst();
        int idx = cursor.getColumnIndex(MediaStore.Images.ImageColumns.DATA);
        return cursor.getString(idx);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    ParseUser current = ParseUser.getCurrentUser();
    private void createAndShowAlertDialog() {
        AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
        builder.setTitle("Log Out?");
        builder.setPositiveButton(android.R.string.yes, new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                final Intent intent = new Intent(MainActivity.this, Login.class);
                ParseUser.logOutInBackground(new LogOutCallback() {


                    @Override
                    public void done(com.parse.ParseException e) {
                        if (e == null) {
                            startActivity(intent);
                        } else {
                            Toast.makeText(getApplicationContext(), "registration failed!", Toast.LENGTH_SHORT).show();
                        }
                    }
                });
                dialog.dismiss();
            }
        });
        builder.setNegativeButton(android.R.string.cancel, new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {

                dialog.dismiss();
            }
        });
        AlertDialog dialog = builder.create();
        dialog.show();
    }

    @Override
    public void onBackPressed() {
//        MainActivity.this.finish();
        System.exit(0);
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

    private class ScreenSlidePagerAdapter extends FragmentStatePagerAdapter {
        public ScreenSlidePagerAdapter(android.support.v4.app.FragmentManager fm) {
            super(fm);
        }

        @Override
        public android.support.v4.app.Fragment getItem(int position) {
            if(position == 0) {
                return new TransactionsFragment();
            }
            if(position == 1) {
                return new TripsFragment();
            }
            else{
                return new SelectedTransactions();
            }
        }



        @Override
        public int getCount() {
            return NUM_PAGES;
        }
    }

    public android.support.v4.app.Fragment getItem(int position) {
        if(position == 0) {
            return new TransactionsFragment();
        }
        if(position == 1) {
            return new TripsFragment();
        }
        else{
            return new SelectedTransactions();
        }
    }
}

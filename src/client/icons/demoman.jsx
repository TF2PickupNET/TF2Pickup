import React from 'react';
import PropTypes from 'prop-types';
import { colors } from 'materialize-react';

function Demoman(props) {
  return (
    <svg
      x="0px"
      y="0px"
      width={`${props.size}px`}
      height={`${props.size}px`}
      viewBox="0 0 37.1 37.1"
    >
      <path
        fill={props.color}
        d={[
          'M0.004,10.25c0,0,6.761-1.389,7.971-0.139c1.566,1.533,1.12,5.657-2.554,6.027C3.095,',
          '16.139,0.004,10.25,0.004,10.25z M8.827,27.545c-1.347,1.346-6.314-0.326-6.314-0.',
          '326s3.224-4.682,4.613-4.633C8.827,22.586,10.751,25.271,8.827,27.545z M28.486,',
          '28.611c0.182,0.184,0.359,0.324,0.629,0.463c-0.447,0.463-0.896,0.928-1.389,',
          '1.344c0,0-8.599-10.8-23.513-11.494c0-0.742,0.044-1.441,0.133-2.134c0.358,',
          '0.185,0.718,0.274,1.075,0.274h0.046h0.045c1.928-0.229,3.314-1.343,3.896-3.061c0.583-',
          '1.62,0.224-3.477-0.806-4.54C8.421,9.278,8.157,9.139,7.884,9C7.93,8.953,7.975,8.862,',
          '8.066,8.768c0,0,14.958,0.559,24.272,12.472c-0.135-0.049-0.313-0.094-0.447-0.094h-0.',
          '047h-0.041c-1.883,0.139-3.361,1.203-3.988,2.922C27.189,25.688,27.502,27.545,',
          '28.486,28.611z M26.156,31.58c-0.67,0.412-1.389,0.783-2.148,1.109c0.09-0.93,',
          '0-1.809-0.402-2.363h-0.043v-0.047c-0.674-0.742-1.525-1.113-2.424-1.113c-1.607,',
          '0-3.134,1.346-3.221,2.826c-0.046,0.467,0.271,1.115,0.76,1.813c-0.045,0-0.045,',
          '0-0.087,0c-0.673,0-1.298-0.049-1.971-0.139c-0.047,0-0.089,0-0.089,',
          '0c-0.137-0.047-0.27-0.047-0.403-0.094c-3.182-0.557-6.003-2.18-8.062-4.543c-',
          '0.182-0.188-0.317-0.369-0.492-0.559c0.716-0.045,1.207-0.232,1.566-0.555v-',
          '0.045h0.045c0.939-1.115,1.12-2.504,0.58-3.711c-0.489-1.203-1.608-2.039-2.64-',
          '2.039H7.081c-0.584,0-1.389,0.604-2.15,1.436c-0.269-0.926-0.494-1.854-0.584-2.828c0.762,',
          '0.047,6.318,0.463,12.632,3.756v0.045c0.803,0.418,1.654,0.881,2.46,1.441C21.723,',
          '27.404,24.008,29.213,26.156,31.58z M9.276,30.838c1.699,1.436,3.714,2.455,5.91,',
          '3.012c-0.896,2.178-4.972,3.154-4.972,3.154S8.558,32.689,9.276,30.838z M10.214,',
          '6.822c1.256-0.927,2.687-1.669,4.165-2.131c0,0.648,0.133,1.246,0.448,1.62l0.044,',
          '0.046c0.672,0.65,1.434,1.021,2.239,1.021c1.521,0,2.956-1.254,3.045-2.688c0.045-0.188,',
          '0-0.373-0.09-0.605c3.719,0.418,6.986,2.271,9.316,5.007c-0.045,0.047-0.135,0.093-0.182,',
          '0.141L29.16,9.278c-0.896,1.022-1.123,2.273-0.629,3.478c0.447,1.114,1.434,1.901,2.418,',
          '1.95h0.045c0.357,0,0.762-0.236,1.209-0.559c0.447,1.343,0.717,2.734,0.762,4.174C32.697,',
          '17.995,26.156,9.372,10.214,6.822z M23.113,17.297c0-2.502-1.975-4.497-4.345-4.497c-2.374',
          ',0-4.345,1.995-4.345,4.497c0,2.46,1.971,4.453,4.345,4.453C21.139,21.75,23.113,19.757,',
          '23.113,17.297z M15.186,6.034c-1.12-1.393,0.628-6.027,0.628-6.027s4.031,3.337,3.941,',
          '4.635C19.617,6.311,17.157,8.026,15.186,6.034z M22.217,17.297c0,1.947-1.523,3.574-3.449,',
          '3.574c-1.926,0-3.446-1.626-3.446-3.574c0-1.992,1.521-3.614,3.446-3.614C20.693,',
          '13.683,22.217,15.305,22.217,17.297z M23.246,30.605c1.166,1.482-0.762,6.488-0.762,',
          '6.488s-4.295-3.615-4.163-5.053C18.455,30.279,21.186,28.471,23.246,30.605z M27.457,',
          '6.589c-1.658-1.25-3.539-2.179-5.645-2.642c1.568-1.949,5.285-3.294,5.285-3.294S27.814,',
          '4.132,27.457,6.589z M37.086,28.104c0,0-6.811,1.203-7.971-0.096c-1.48-1.578-0.896-5.703,',
          '2.729-5.98C34.174,22.166,37.086,28.104,37.086,28.104z M29.516,9.559c1.299-1.162,5.822,',
          '0.46,5.822,0.46s-3.09,4.267-4.344,4.22C29.383,14.195,27.682,11.645,29.516,9.559z',
        ].join('')}
      />
    </svg>
  );
}

Demoman.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

Demoman.defaultProps = {
  color: colors.blackIcons,
  size: 48,
};

export default Demoman;

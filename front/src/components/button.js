import React from 'react';
import '../styles/Button.css';

// Button 컴포넌트 정의
const Button = ({
  type = 'button',       // 버튼 타입 ('button', 'submit', 'reset' 등)
  onClick,               // 클릭 이벤트 핸들러
  children,              // 버튼 내부의 텍스트나 요소
  style = {},            // 인라인 스타일로 커스텀 스타일 적용 가능
  className = '',        // CSS 클래스명 추가
  disabled = false,      // 비활성화 여부
  variant = 'default',   // 버튼 스타일 유형 ('default', 'primary', 'secondary' 등)
  size = 'medium',       // 버튼 크기 ('small', 'medium', 'large' 등)
  ...props               // 추가적으로 필요한 다른 속성
}) => {
  // variant와 size에 따른 클래스 추가
  const baseClass = 'btn'; 
  const variantClass = variant ? `btn-${variant}` : '';
  const sizeClass = size ? `btn-${size}` : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

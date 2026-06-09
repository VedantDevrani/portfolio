import { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef(null);

  useEffect(() => {
    // Check touch device
    if (window.matchMedia('(hover: none)').matches) return;

    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const lerp = (start, end, t) => start + (end - start) * t;

    const animate = () => {
      followerPos.current.x = lerp(followerPos.current.x, mousePos.current.x, 0.12);
      followerPos.current.y = lerp(followerPos.current.y, mousePos.current.y, 0.12);

      if (followerRef.current) {
        const size = isHovering ? 48 : 32;
        followerRef.current.style.transform = `translate(${followerPos.current.x - size / 2}px, ${followerPos.current.y - size / 2}px)`;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, [data-cursor-expand]')) {
        setIsHovering(true);
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest('a, button, [data-cursor-expand]')) {
        setIsHovering(false);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [isHovering]);

  return (
    <>
      {/* Main dot cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
        style={{ willChange: 'transform' }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{
            background: '#14B8A6',
            boxShadow: '0 0 8px #14B8A6, 0 0 16px rgba(20,184,166,0.5)',
            transform: isClicking ? 'scale(0.7)' : 'scale(1)',
            transition: 'transform 0.1s',
          }}
        />
      </div>

      {/* Follower ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-screen"
        style={{ willChange: 'transform' }}
      >
        <div
          style={{
            width: isHovering ? '48px' : '32px',
            height: isHovering ? '48px' : '32px',
            borderRadius: '50%',
            border: `1.5px solid ${isHovering ? 'rgba(20,184,166,0.8)' : 'rgba(20,184,166,0.4)'}`,
            boxShadow: isHovering
              ? '0 0 20px rgba(20,184,166,0.3), inset 0 0 20px rgba(20,184,166,0.1)'
              : 'none',
            background: isHovering ? 'rgba(20,184,166,0.05)' : 'transparent',
            transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1), height 0.3s cubic-bezier(0.4,0,0.2,1), border-color 0.3s, box-shadow 0.3s, background 0.3s',
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;

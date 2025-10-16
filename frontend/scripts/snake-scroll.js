// Snake scroll indicator that moves around graphs

function initSnakeScroll() {
  const snakeContainer = document.getElementById('snake-scroll');
  const snakePath = document.getElementById('snake-path');
  const snakeThumb = document.getElementById('snake-thumb');
  
  if (!snakeContainer || !snakePath || !snakeThumb) return;

  let isDragging = false;
  let pathPoints = [];
  
  // Calculate path points based on page sections and graphs
  function calculatePath() {
    pathPoints = [];
    const sections = document.querySelectorAll('.page');
    const viewportHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    
    // Start point - top right
    pathPoints.push({ x: window.innerWidth - 100, y: 100 });
    
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const scrollY = window.scrollY;
      const sectionTop = rect.top + scrollY;
      const sectionMiddle = sectionTop + (rect.height / 2);
      
      // Alternate between left and right
      const isLeft = index % 2 === 0;
      const x = isLeft ? 100 : window.innerWidth - 100;
      
      // Add point at section middle
      pathPoints.push({ x, y: sectionMiddle });
    });
    
    // End point - bottom right
    pathPoints.push({ x: window.innerWidth - 100, y: docHeight - 100 });
    
    drawPath();
  }
  
  // Draw SVG path
  function drawPath() {
    if (pathPoints.length < 2) return;
    
    let pathData = `M ${pathPoints[0].x} ${pathPoints[0].y}`;
    
    // Create smooth curves between points
    for (let i = 1; i < pathPoints.length; i++) {
      const prev = pathPoints[i - 1];
      const curr = pathPoints[i];
      
      // Calculate control points for smooth curve
      const cp1x = prev.x;
      const cp1y = prev.y + (curr.y - prev.y) / 3;
      const cp2x = curr.x;
      const cp2y = curr.y - (curr.y - prev.y) / 3;
      
      pathData += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
    }
    
    snakePath.setAttribute('d', pathData);
  }
  
  // Update thumb position based on scroll
  function updateThumbPosition() {
    if (isDragging) return;
    
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const totalLength = snakePath.getTotalLength();
    const point = snakePath.getPointAtLength(scrollPercent * totalLength);
    
    snakeThumb.style.left = `${point.x}px`;
    snakeThumb.style.top = `${point.y}px`;
  }
  
  // Handle scroll
  function handleScroll() {
    requestAnimationFrame(updateThumbPosition);
    
    // Show/hide snake
    if (window.scrollY > 100) {
      snakeContainer.classList.add('visible');
    } else {
      setTimeout(() => {
        if (window.scrollY <= 100) {
          snakeContainer.classList.remove('visible');
        }
      }, 1500);
    }
  }
  
  // Handle dragging
  snakeThumb.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
    document.body.style.userSelect = 'none';
  });
  
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    // Find closest point on path
    const totalLength = snakePath.getTotalLength();
    let closestDistance = Infinity;
    let closestPercent = 0;
    
    for (let i = 0; i <= 100; i++) {
      const percent = i / 100;
      const point = snakePath.getPointAtLength(percent * totalLength);
      const distance = Math.sqrt(
        Math.pow(e.clientX - point.x, 2) + 
        Math.pow(e.clientY - point.y, 2)
      );
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestPercent = percent;
      }
    }
    
    // Scroll to corresponding position
    const scrollY = closestPercent * (document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: scrollY, behavior: 'auto' });
  });
  
  window.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = '';
  });
  
  // Initialize after a delay to ensure content is loaded
  setTimeout(() => {
    calculatePath();
    updateThumbPosition();
  }, 1000);
  
  // Recalculate on scroll and resize
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', () => {
    calculatePath();
    updateThumbPosition();
  });
  
  // Force visible for testing
  snakeContainer.classList.add('visible');
}

// Initialize when DOM is ready and after content loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initSnakeScroll, 2000);
  });
} else {
  setTimeout(initSnakeScroll, 2000);
}

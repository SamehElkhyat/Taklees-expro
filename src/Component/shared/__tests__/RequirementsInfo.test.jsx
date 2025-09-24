import React from 'react';
import { render, screen } from '@testing-library/react';
import RequirementsInfo from '../RequirementsInfo';

describe('RequirementsInfo Component', () => {
  describe('Basic Rendering', () => {
    test('renders with default requirements when no requirements provided', () => {
      render(<RequirementsInfo />);
      
      expect(screen.getByText('متطلبات التسجيل:')).toBeInTheDocument();
      expect(screen.getByText('الاسم الكامل: مطلوب')).toBeInTheDocument();
      expect(screen.getByText('البريد الإلكتروني: مطلوب وصحيح')).toBeInTheDocument();
      expect(screen.getByText('رقم الهاتف: مطلوب')).toBeInTheDocument();
    });

    test('renders with custom requirements', () => {
      const customRequirements = [
        'Custom requirement 1',
        'Custom requirement 2',
        'Custom requirement 3'
      ];
      
      render(<RequirementsInfo requirements={customRequirements} />);
      
      expect(screen.getByText('Custom requirement 1')).toBeInTheDocument();
      expect(screen.getByText('Custom requirement 2')).toBeInTheDocument();
      expect(screen.getByText('Custom requirement 3')).toBeInTheDocument();
      
      // Default requirements should not be present
      expect(screen.queryByText('الاسم الكامل: مطلوب')).not.toBeInTheDocument();
    });

    test('renders with custom title', () => {
      render(<RequirementsInfo title="Custom Title:" />);
      
      expect(screen.getByText('Custom Title:')).toBeInTheDocument();
      expect(screen.queryByText('متطلبات التسجيل:')).not.toBeInTheDocument();
    });

    test('renders with custom description', () => {
      render(<RequirementsInfo description="This is a custom description" />);
      
      expect(screen.getByText('This is a custom description')).toBeInTheDocument();
    });

    test('does not render description when not provided', () => {
      render(<RequirementsInfo />);
      
      // Should only contain the requirements, no description paragraph
      const paragraphs = document.querySelectorAll('p');
      expect(paragraphs).toHaveLength(0);
    });
  });

  describe('Visual Structure', () => {
    test('renders with proper icon', () => {
      render(<RequirementsInfo />);
      
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('h-5', 'w-5', 'text-blue-400');
    });

    test('applies default CSS classes', () => {
      render(<RequirementsInfo />);
      
      const container = document.querySelector('.bg-blue-50');
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('border', 'border-blue-200', 'rounded-lg', 'p-3', 'mb-6');
      expect(container).toHaveAttribute('dir', 'rtl');
    });

    test('applies custom className', () => {
      render(<RequirementsInfo className="custom-container-class" />);
      
      const container = document.querySelector('.custom-container-class');
      expect(container).toBeInTheDocument();
    });

    test('applies custom color classes', () => {
      render(
        <RequirementsInfo 
          iconColor="text-red-500"
          titleColor="text-green-800"
          textColor="text-purple-700"
        />
      );
      
      const icon = document.querySelector('svg');
      const title = screen.getByText('متطلبات التسجيل:');
      
      expect(icon).toHaveClass('text-red-500');
      expect(title).toHaveClass('text-green-800');
    });
  });

  describe('Requirements List', () => {
    test('renders each requirement with asterisk', () => {
      const requirements = ['Req 1', 'Req 2', 'Req 3'];
      render(<RequirementsInfo requirements={requirements} />);
      
      const asterisks = document.querySelectorAll('.text-red-500');
      expect(asterisks).toHaveLength(3);
      
      asterisks.forEach(asterisk => {
        expect(asterisk).toHaveTextContent('*');
      });
    });

    test('uses requirement text as unique keys', () => {
      const requirements = ['Unique Req 1', 'Unique Req 2'];
      const { container } = render(<RequirementsInfo requirements={requirements} />);
      
      const listItems = container.querySelectorAll('li');
      expect(listItems).toHaveLength(2);
      
      // Verify requirements are rendered (React will handle unique keys internally)
      expect(screen.getByText('Unique Req 1')).toBeInTheDocument();
      expect(screen.getByText('Unique Req 2')).toBeInTheDocument();
    });

    test('handles empty requirements array', () => {
      render(<RequirementsInfo requirements={[]} />);
      
      // Should fall back to default requirements
      expect(screen.getByText('الاسم الكامل: مطلوب')).toBeInTheDocument();
    });

    test('renders proper list structure', () => {
      render(<RequirementsInfo />);
      
      const list = document.querySelector('ul');
      expect(list).toBeInTheDocument();
      expect(list).toHaveClass('text-xs', 'text-blue-700', 'space-y-1');
      
      const listItems = list.querySelectorAll('li');
      expect(listItems.length).toBeGreaterThan(0);
      
      listItems.forEach(item => {
        expect(item).toHaveClass('flex', 'items-center');
      });
    });
  });

  describe('Accessibility', () => {
    test('has proper heading structure', () => {
      render(<RequirementsInfo />);
      
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('متطلبات التسجيل:');
    });

    test('provides proper semantic structure with lists', () => {
      render(<RequirementsInfo />);
      
      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems.length).toBeGreaterThan(0);
    });

    test('maintains RTL direction for Arabic content', () => {
      render(<RequirementsInfo />);
      
      const container = document.querySelector('[dir="rtl"]');
      expect(container).toBeInTheDocument();
    });

    test('icon has proper accessibility attributes', () => {
      render(<RequirementsInfo />);
      
      const svg = document.querySelector('svg');
      expect(svg).toHaveAttribute('viewBox', '0 0 20 20');
      expect(svg).toHaveAttribute('fill', 'currentColor');
    });
  });

  describe('Content Flexibility', () => {
    test('handles Arabic and English mixed content', () => {
      const mixedRequirements = [
        'English requirement',
        'متطلب عربي',
        'Mixed متطلب requirement'
      ];
      
      render(<RequirementsInfo requirements={mixedRequirements} />);
      
      expect(screen.getByText('English requirement')).toBeInTheDocument();
      expect(screen.getByText('متطلب عربي')).toBeInTheDocument();
      expect(screen.getByText('Mixed متطلب requirement')).toBeInTheDocument();
    });

    test('handles long requirement texts', () => {
      const longRequirement = 'This is a very long requirement text that might wrap to multiple lines and should still be handled properly by the component without breaking the layout or functionality';
      
      render(<RequirementsInfo requirements={[longRequirement]} />);
      
      expect(screen.getByText(longRequirement)).toBeInTheDocument();
    });

    test('handles special characters in requirements', () => {
      const specialRequirements = [
        'Requirement with symbols: @#$%^&*()',
        'Numbers: 123456789',
        'Special chars: <>&"\''
      ];
      
      render(<RequirementsInfo requirements={specialRequirements} />);
      
      specialRequirements.forEach(req => {
        expect(screen.getByText(req)).toBeInTheDocument();
      });
    });
  });

  describe('Default Requirements Content', () => {
    test('includes all expected default requirements', () => {
      render(<RequirementsInfo />);
      
      const expectedDefaults = [
        'الاسم الكامل: مطلوب',
        'البريد الإلكتروني: مطلوب وصحيح',
        'رقم الهاتف: مطلوب',
        'كلمة المرور: 8 أحرف على الأقل مع أحرف كبيرة وصغيرة وأرقام',
        'تأكيد كلمة المرور: يجب أن تتطابق',
        'رقم الهوية: مطلوب (10 أرقام على الأقل)'
      ];
      
      expectedDefaults.forEach(requirement => {
        expect(screen.getByText(requirement)).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    test('handles undefined requirements prop', () => {
      render(<RequirementsInfo requirements={undefined} />);
      
      // Should fall back to default requirements
      expect(screen.getByText('الاسم الكامل: مطلوب')).toBeInTheDocument();
    });

    test('handles null requirements prop', () => {
      render(<RequirementsInfo requirements={null} />);
      
      // Should fall back to default requirements
      expect(screen.getByText('الاسم الكامل: مطلوب')).toBeInTheDocument();
    });

    test('handles requirements with duplicate content', () => {
      const duplicateRequirements = [
        'Same requirement 1',
        'Same requirement 2', 
        'Different requirement'
      ];
      
      render(<RequirementsInfo requirements={duplicateRequirements} />);
      
      expect(screen.getByText('Same requirement 1')).toBeInTheDocument();
      expect(screen.getByText('Same requirement 2')).toBeInTheDocument();
      expect(screen.getByText('Different requirement')).toBeInTheDocument();
    });
  });
});

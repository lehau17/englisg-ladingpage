'use client';

import { ContactFormData, ContactFormResponse, submitContactForm } from '@/lib/api';
import { useState } from 'react';

export default function ContactForm() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        phone: '',
        email: '',
        level: '',
        goals: [],
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState<ContactFormResponse | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (goal: string) => {
        setFormData(prev => ({
            ...prev,
            goals: prev.goals?.includes(goal)
                ? prev.goals.filter(g => g !== goal)
                : [...(prev.goals || []), goal]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitResult(null);

        try {
            const result = await submitContactForm(formData);
            setSubmitResult(result);

            if (result.success) {
                // Reset form on success
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    level: '',
                    goals: [],
                    message: ''
                });
            }
        } catch (error) {
            setSubmitResult({
                success: false,
                message: 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Gửi tin nhắn cho chúng tôi</h3>

            {submitResult && (
                <div className={`mb-6 p-4 rounded-xl ${submitResult.success
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                    {submitResult.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Họ tên *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white"
                            placeholder="Nhập họ tên của bạn"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại *</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white"
                            placeholder="Nhập số điện thoại"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white"
                        placeholder="Nhập địa chỉ email"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Trình độ hiện tại</label>
                    <select
                        name="level"
                        value={formData.level}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white"
                    >
                        <option value="">Chọn trình độ của bạn</option>
                        <option value="beginner">Mới bắt đầu (Beginner)</option>
                        <option value="elementary">Cơ bản (Elementary)</option>
                        <option value="intermediate">Trung cấp (Intermediate)</option>
                        <option value="upper-intermediate">Khá (Upper-Intermediate)</option>
                        <option value="advanced">Thành thạo (Advanced)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mục tiêu học tập</label>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            "Giao tiếp hàng ngày",
                            "Công việc/Kinh doanh",
                            "Thi IELTS/TOEIC",
                            "Du học",
                            "Du lịch",
                            "Khác"
                        ].map((goal, index) => (
                            <label key={index} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.goals?.includes(goal) || false}
                                    onChange={() => handleCheckboxChange(goal)}
                                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                />
                                <span className="text-sm text-gray-700">{goal}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tin nhắn</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white resize-none"
                        placeholder="Chia sẻ thêm về mong muốn học tập của bạn..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn 📨'}
                </button>
            </form>
        </div>
    );
}

